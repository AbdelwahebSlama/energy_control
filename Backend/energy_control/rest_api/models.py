import datetime
from django.db import models


class Device(models.Model):
    device_id = models.PositiveIntegerField()
    alarm_status = models.BooleanField(default=False)



class Alarm_config(models.Model):
    """ Model"""
    device_id = models.ForeignKey('Device', on_delete=models.CASCADE, null=True, blank=True)  # 1 or 2
    low_alarm = models.PositiveSmallIntegerField(default=1000)
    low_warning = models.PositiveSmallIntegerField(default=2000)
    high_warning = models.PositiveSmallIntegerField(default=3000)
    high_alarm = models.PositiveSmallIntegerField(default=4000)

class MeasurementMonth(models.Model):
    id_device = models.PositiveIntegerField()
    date = models.DateField()
    en_L1 = models.FloatField()
    cons_en_L1 = models.FloatField()
    en_L2 = models.FloatField()
    cons_en_L2 = models.FloatField()
    en_L3 = models.FloatField()
    cons_en_L3 = models.FloatField()
    cons_glbal = models.FloatField()


class Measurement(models.Model):
    """ Model to store all sensor reads. """
    id_device = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now=True)
    en_L1 = models.FloatField()
    cons_en_L1 = models.FloatField()
    en_L2 = models.FloatField()
    cons_en_L2 = models.FloatField()
    en_L3 = models.FloatField()
    cons_en_L3 = models.FloatField()
    min_cosfi_L1 = models.FloatField()
    max_cosfi_L1 = models.FloatField()
    moy_cosfi_L1 = models.FloatField()
    min_cosfi_L2 = models.FloatField()
    max_cosfi_L2 = models.FloatField()
    moy_cosfi_L2 = models.FloatField()
    min_cosfi_L3 = models.FloatField()
    max_cosfi_L3 = models.FloatField()
    moy_cosfi_L3 = models.FloatField()
    cons_glbal = models.FloatField()

    class Meta:
        db_table = 'Measurement'


class Invoce(models.Model):
    device_id = models.PositiveIntegerField()
    total_consumption = models.FloatField()
    total_pricing = models.FloatField()


class Prediction(models.Model):
    date = models.DateTimeField(auto_now=True)
    device_id = models.PositiveIntegerField()
    prediction = models.FloatField()

class prediction_logs(models.Model):
    date = models.DateTimeField()
    device_id = models.PositiveIntegerField()
    log = models.CharField(max_length=500)
    log_level = models.CharField(max_length=20)
    value = models.FloatField()


class alarm_logs(models.Model):
    date = models.DateField()
    created = models.DateTimeField(auto_now=True)
    device_id = models.PositiveIntegerField()
    log = models.CharField(max_length=500)
    log_level = models.CharField(max_length=20)
    value = models.FloatField()




class Statistics(models.Model):
    device_id = models.PositiveIntegerField()
    year = models.FloatField()
    day = models.FloatField()
    month = models.FloatField()


class AlarmDisabled(models.Model):
    start_time = models.DateTimeField()
    disable_time = models.FloatField()
    device_id = models.PositiveIntegerField()