from django.shortcuts import render
from rest_framework import generics, permissions
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer
from .serializers import *
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from threading import Thread
from rest_api.packages.alarm import *
from rest_api.packages.prediction import *
from rest_api.packages.prediction_month import *
from rest_api.packages.logger import *
from datetime import datetime
from collections import deque


P = predector()
P_month = predectorMonth()

devices = Device.objects.all()
alarm_params = {}
for device in devices:
    alarm_config = Alarm_config.objects.filter(device_id=device).get()
    alarm_params[device.device_id] = {
        "low_alarm": alarm_config.low_alarm,
        "high_alarm": alarm_config.high_alarm,
        "low_warning": alarm_config.low_warning,
        "high_warning": alarm_config.high_warning,
    }
alarm_agent = AlarmHandler(alarm_params)
th_alarm = Thread(target=alarm_agent.Agent)
th_alarm.start()
alarm_agent.start()
Logger = logger(3600)


def log_sensors():
    while True:
        t = datetime.now()
        if t.minute == '00':
            for device in alarm_agent.sensors_reading.keys():
                Logger.log_sensors(device, alarm_agent.sensors_reading[device])
            time.sleep(1000)
        time.sleep(30)


def predict_alarm():
    while True:
        devices = Device.objects.all()
        #1 h 2h 3 h
        date = 1
        results = {}
        for device in devices:
            measurements = list(Measurement.objects.filter(id_device=device.device_id).values_list("cons_glbal"))[-50:]
            data = []
            # print(list(measurements))
            for measurement in measurements:
                data.append(measurement[0])
            deque_data = deque(data)
            results[device.device_id] = {}
            for hour in range(1, int(date) + 1):
                result = float(P.predict(deque_data)[0][0])
                deque_data.pop()
                deque_data.append(result)
                results[device.device_id][hour] = result
        alarm_agent.checkAlarm(results)
        time.sleep(1500)


th_predictor = Thread(target=predict_alarm)
th_predictor.start()
th_logger = Thread(target=log_sensors)
th_logger.start()



# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# login API
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


@api_view(['GET'])
def historiqueView(request):
    list_devices = Device.objects.all()
    for device in list_devices:
        measurements = Measurement.objects.filter(id_device=device.device_id)
        data = []
        for measurement in measurements:
            tmp = {
                "id_device": measurement.id_device,
                'date': measurement.date,
                'cons_en_L1': measurement.cons_en_L1,
                'cons_en_L2': measurement.cons_en_L2,
                'cons_en_L3': measurement.cons_en_L3,
                'cons_glbal': measurement.cons_glbal
            }
            data.append(tmp)

    return Response({"data": data})


@api_view(["POST"])
def addDeviceView(request):
    device_id = request.data['id_device']
    if device_id:
        device_low_alarm = request.data['low_alarm']
        device_high_alarm = request.data['high_alarm']
        device_low_warning = request.data['low_warning']
        device_high_warning = request.data['high_warning']
        D = Device()
        D.device_id = device_id
        D.save()
        if (device_low_alarm and device_high_alarm and device_low_warning and device_high_warning):
            alarm = Alarm_config(device_id=D,
                                 low_alarm=device_low_alarm,
                                 high_alarm=device_high_alarm,
                                 low_warning=device_low_warning,
                                 high_warning=device_high_alarm
                                 )
            alarm.save()
        else:
            alarm = Alarm_config(device_id=D)
            alarm.save()

    return Response({})


@api_view(['GET'])
def historiqueAlarmView(request):
    alarm_history = alarm_logs.objects.all()
    data = []
    for alarm in alarm_history:
        temp = {
            "date": alarm.date,
            "device_id": alarm.device_id,
            "log": alarm.log,
            "created": alarm.created,
            "log_level": alarm.log_level,
            "value": alarm.value}
        data.append(temp)
    return Response({"data": data})


@api_view(["GET"])
def listDeviceView(request):
    list_devices = Device.objects.all()
    devices = {}
    for device in list_devices:
        devices[device.divice_id: device.alarm_status]
    print(devices)
    return Response(devices)


@api_view(["GET"])
def alarmStatusView(request):
    data = alarm_agent.alarm_flags
    return Response({"data": data})


# valeeur predict alarme
@api_view(["GET"])
def alarmPredictedView(request):
    data = alarm_agent.predicted_alarm_flags
    return Response({"data": data})



@api_view(["GET"])
def streamingView(request):
    data_sensors = alarm_agent.sensors_reading
    data = {}
    for device in data_sensors.keys():
        data[device] = data_sensors[device]
    # print(data)
    return Response(data)


@api_view(["GET"])
def deviceReadingsView(request):
    data_sensors = alarm_agent.sensors_reading
    data_alarm = alarm_agent.alarm_flags
    data = {}
    for device in data_alarm.keys():
        data[device] = {"cons": data_sensors[device],
                        "alarm": data_alarm[device],
                        }
    return Response(data)


@api_view(["GET", "POST"])
def deviceConfigView(request):
    if request.method == "POST":
        low_alarm = request.data['low_alarm']
        high_alarm = request.data['high_alarm']
        low_warning = request.data['low_warning']
        high_warning = request.data['high_warning']
        device_id = request.data['id']
        device = Device.objects.filter(device_id=device_id).get()
        alarm_config = Alarm_config.objects.filter(device_id=device).get()
        alarm_config.low_alarm = low_alarm
        alarm_config.high_alarm = high_alarm
        alarm_config.low_warning = low_warning
        alarm_config.high_warning = high_warning
        alarm_config.save()
        data = {'low_alarm': low_alarm,
                'high_alarm': high_alarm,
                'low_warning': low_warning,
                'high_warning': high_warning
                }

        alarm_agent.configAlarm(device_id, data)
        date = request.data['freedate']
        if date and device_id:
            datetimeobject = datetime.strptime(date, '%Y-%m-%d')
            date = datetimeobject
            a = AlarmDisabled(start_time=date, disable_time=24, device_id=device_id)
            a.save()

        return Response({"message": "success"})

    elif request.method == "GET":
        device_id = request.GET.get('id')
        print(device_id)
        device = Device.objects.filter(device_id=device_id).get()
        alarm_config = Alarm_config.objects.filter(device_id=device).get()
        data = {
            "low_alarm": alarm_config.low_alarm,
            "high_alarm": alarm_config.high_alarm,
            "low_warning": alarm_config.low_warning,
            "high_warning": alarm_config.high_warning,
        }

        # print(data)
        return Response(data)


@api_view(["POST"])
def disable_alarm(request):
    date = request.POST.get("date")
    hours = request.POST.get("hours")
    device_id = request.POST.get("id")
    if date and hours and device_id:
        date = datetime.strptime(date)
        a = AlarmDisabled(start_time=date, disable_time=hours, device_id=device_id)
        a.save()

    return Response({})

# @api_view(["POST"])
# def disable_device(request):
#     device_id = request.POST.get("id")
#     device = Device.objects.filter(device_id=device_id)
#     if device_id:
#         a = AlarmDisabled(start_time=date, disable_time=hours, device_id=device_id)
#         a.save()
#
#     return Response({})

@api_view(['POST', 'GET'])
def historiqueChartView(request):
    periode = request.GET.get("date")
    devices = Device.objects.all()

    data = {}
    for device in devices:
        measurements = Measurement.objects.filter(id_device=device.device_id)
        temp = {}
        if periode == "year":

            for measurement in measurements:
                if temp.get(measurement.date.year):
                    temp[measurement.date.year] = measurement.cons_glbal + temp[measurement.date.year]
                else:
                    temp[measurement.date.year] = measurement.cons_glbal
        elif periode == "month":
            for measurement in measurements:
                if temp.get(measurement.date.month):
                    temp[measurement.date.month] = measurement.cons_glbal + temp[measurement.date.month]
                else:
                    temp[measurement.date.month] = measurement.cons_glbal
        elif periode == "day":
            for measurement in measurements:
                if temp.get(measurement.date.strftime("%A")):
                    temp[measurement.date.strftime("%A")] = measurement.cons_glbal + temp[
                        measurement.date.strftime("%A")]
                else:
                    temp[measurement.date.strftime("%A")] = measurement.cons_glbal
        data[device.device_id] = temp
    # print(data)
    return Response(data)


@api_view(['GET'])
def listIdDevice(request):
    devices = Device.objects.all()
    data = []
    etat = []
    for device in devices:
        data.append(device.device_id)
        etat.append(device.alarm_status)

    return Response({"data": data, "etat": etat})


@api_view(['GET'])
def PredictionView(request):
    devices = Device.objects.all()
    date = request.GET["time"]
    results = {}
    for device in devices:
        measurements = list(Measurement.objects.filter(id_device=device.device_id).values_list("cons_glbal"))[-50:]
        # print(list(measurements))
        data = []
        for measurement in measurements:
            data.append(measurement[0])
        deque_data = deque(data)
        results[device.device_id] = {}
        for hour in range(1, int(date) + 1):
            result = float(P.predict(deque_data)[0][0])
            deque_data.pop()
            deque_data.append(result)
            results[device.device_id][hour] = result



    alarm_agent.checkAlarm(results)
    return Response(results)


@api_view(['GET'])
def Prediction_MonthView(request):
    devices = Device.objects.all()
    # date = request.GET["time"]
    results = {}
    for device in devices:
        measurements = list(MeasurementMonth.objects.filter(id_device=device.device_id).values_list("cons_glbal"))[-12:]
        data = []
        for measurement in measurements:
            data.append(measurement[0])

        result = float(P_month.predict(data)[0][0])
        results[device.device_id] = result
        print('resssslt ', result)
    res = 0
    for item in results:
        res = res + results[item]



    return Response({'results': res})


@api_view(["GET"])
def alarmChartView(request):
    alarm_objects = alarm_logs.objects.all()
    real_alarm = []
    for alarm in alarm_objects:
        real_alarm.append(alarm.created)
    prediction_alarm_logs = prediction_logs.objects.all()

    prediction_alarm = []
    for alarm in prediction_alarm_logs:
        prediction_alarm.append(alarm.date)
    data_real_alarm = {}
    data_predicted_alarm = {}

    for t in prediction_alarm:
        if data_predicted_alarm.get(t.hour):
            data_predicted_alarm[t.hour] = data_predicted_alarm[t.hour] + 1
        else:
            data_predicted_alarm[t.hour] = 1

    # print('alarm real ', real_alarm)

    for t in real_alarm:
        if data_real_alarm.get(t.hour):
            data_real_alarm[t.hour] = data_real_alarm[t.hour] + 1
        else:
            data_real_alarm[t.hour] = 1

    data = {
        "real": data_real_alarm,
        "predicted": data_predicted_alarm,
    }
    return Response(data)
