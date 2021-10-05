import os
import logging
from enum import Enum
from rest_api.packages.sensors import *
from rest_api.packages.logger import *
from rest_api.models import AlarmDisabled
import time
from datetime import timedelta, datetime
from django.utils import timezone


class Status(Enum):
    eStopped = 0,
    eRunning = 1


class AlarmHandler:
    def __init__(self, alarm_config):
        self.alarm_flags = {}
        self.predicted_alarm_flags = {}
        for device in alarm_config.keys():
            self.alarm_flags[device] = "no_alarm"
        for device in alarm_config.keys():
            self.predicted_alarm_flags[device] = "no_alarm"
        self.alarm_config = alarm_config
        self.sensors_reading = {}
        self.status = Status.eStopped
        self.periode = 1000

    def get_alarm_status(self, alarm_config, current_readings):
        if (alarm_config["low_alarm"] <= current_readings) and (alarm_config["high_alarm"] > current_readings):
            return "low_alarm"
        elif alarm_config["high_alarm"] <= current_readings:
            return "high_alarm"
        elif alarm_config["high_warning"] >= current_readings:
            return "high_warning"
        elif (alarm_config["high_warning"] < current_readings) and (alarm_config["low_warning"] >= current_readings):
            return "low_warning"
        else:
            return "no_alarm"

    def Agent(self):
        while True:
            if self.status == Status.eRunning:
                for device in self.alarm_flags.keys():
                    readings = Sensors.get_readings(device)
                    alarm_status = self.get_alarm_status(self.alarm_config[device], readings["cons_glbal"])
                    self.sensors_reading[device] = readings
                    self.alarm_flags[device] = alarm_status
                for device in self.alarm_flags.keys():
                    if self.alarm_flags[device] != "no_alarm":
                        if self.isAlarmEnabled(datetime.now(), device):
                            # print(self.alarm_flags[device], device)
                            logger.log_alarm(device,
                                             "cause d'alarm ",
                                             self.alarm_flags[device],
                                             readings["cons_glbal"]
                                             )
            time.sleep(2)

    def configAlarm(self, device_id, alarm_config):
        self.alarm_config[device_id] = alarm_config

    def start(self):
        self.status = Status.eRunning

    def stop(self):
        self.status = Status.eStopped

    def checkAlarm(self, sensor_values):
        for device in sensor_values.keys():
            for hour in sensor_values[device].keys():
                readings = sensor_values[device][hour]
                alarm_status = self.get_alarm_status(self.alarm_config[device], readings)
                self.predicted_alarm_flags[device] = alarm_status
                if alarm_status != "no_alarm":
                    if self.isAlarmEnabled(timezone.now(), device):
                        logger.log_prediction(device,
                                              "cause d'alarm",
                                              alarm_status,
                                              readings
                                              )
                        logger.log_prediction_values(device, readings, hour)

    def isAlarmEnabled(self, date, device_id):
        alarm_disabled = AlarmDisabled.objects.filter(device_id=device_id)
        for alarm in alarm_disabled:
            start_time = alarm.start_time
            disable_periode = alarm.disable_time
            end_time = start_time + timedelta(hours=24)
            if date.replace(tzinfo=None) > start_time.replace(tzinfo=None) and date.replace(
                    tzinfo=None) < end_time.replace(tzinfo=None):
                return False
        return True
