
from django.urls import path, include
from .views import *
from knox import views as knox_views


urlpatterns = [
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/historique/', historiqueView, name='historique'),
    path('api/device/getListDevices/', deviceReadingsView, name='getListDevices'),
    path('api/device/getDevicePerId/', deviceConfigView, name='getListDevices'),
    path('api/historiqueChart/', historiqueChartView, name='historiqueChart'),
    path('api/streaming/', streamingView, name='streaming'),
    path('api/listalarme/', historiqueAlarmView, name='listalarme'),
    path('api/addDevice/', addDeviceView, name='addDevice'),
    path('api/alarmStatus/', alarmStatusView, name='alarmStatus'),
    path('api/listDeviceId/', listIdDevice, name='listIdDevice'),
    path('api/predict/', PredictionView, name='predict'),
    path('api/predictMonth/', Prediction_MonthView, name='Prediction_MonthView'),
    path('api/alarmChart/', alarmChartView, name='alarmChart'),
    path('api/disableAlarm/', disable_alarm, name='disableAlarm'),
    path('api/alarmPredict', alarmPredictedView, name='alarmPredict'),
]