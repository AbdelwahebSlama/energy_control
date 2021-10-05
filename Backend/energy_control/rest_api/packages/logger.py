from rest_api.models import alarm_logs, Measurement, prediction_logs, Prediction
from django.utils import timezone
from enum import Enum
import time
from datetime import datetime, timedelta



class Status(Enum):
    eStopped = 0,
    eRunning = 1

class logger:
    def __init__(self, sensors_priode):
        self.log_peride = sensors_priode
        self.status = Status.eStopped

    def log_sensors(self, id_device,readings):
        measurement = Measurement(
                            id_device = id_device,
                            cons_en_L1 =readings["cons_en_L1"] ,
                            cons_en_L2 = readings["cons_en_L2"] ,
                            cons_en_L3 = readings["cons_en_L3"] ,
                            en_L1 = readings["cons_en_L1"],
                            en_L2 = readings["cons_en_L2"],
                            en_L3 = readings["cons_en_L3"],
                            cons_glbal = readings["cons_glbal"],
                            min_cosfi_L1 = readings["min_cosfi_L1"] ,
                            max_cosfi_L1 = readings["max_cosfi_L1"] ,
                            moy_cosfi_L1 = readings["moy_cosfi_L1"] ,
                            min_cosfi_L2 = readings["min_cosfi_L2"] ,
                            max_cosfi_L2 = readings["max_cosfi_L2"] ,
                            moy_cosfi_L2 = readings["moy_cosfi_L2"] ,
                            min_cosfi_L3 = readings["min_cosfi_L3"] ,
                            max_cosfi_L3 = readings["max_cosfi_L3"] ,
                            moy_cosfi_L3 = readings["moy_cosfi_L3"]
                            )
        measurement.save()



    def configSensorLogger(self, peride):
        self.log_peride = peride


    @staticmethod
    def log_alarm(device_id, alarm_info, alarm_status, value):
        alarm = alarm_logs(date=timezone.now(),
                 device_id=device_id,
                 log=alarm_info,
                 log_level=alarm_status,
                 value=value
                 )
        alarm.save()
    @staticmethod
    def log_prediction(device_id, alarm_info, alarm_status, value):
        alarm = prediction_logs(date=timezone.now(),
                 device_id=device_id,
                 log=alarm_info,
                 log_level=alarm_status,
                 value=value
                 )
        alarm.save()

    @staticmethod
    def log_prediction_values(device, value, hour):
        now = datetime.now()
        hours = timedelta(hours=hour)
        pred = Prediction(device_id=device, prediction=value, date=now+hours)
        pred.save()
