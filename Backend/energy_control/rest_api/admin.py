from django.contrib import admin
from .models import *

admin.site.register(Device)
admin.site.register(Measurement)
admin.site.register(alarm_logs)
admin.site.register(MeasurementMonth)

# Register your models here.
