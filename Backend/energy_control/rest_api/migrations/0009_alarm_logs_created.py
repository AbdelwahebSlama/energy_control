# Generated by Django 3.2.3 on 2021-06-07 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0008_alter_alarm_logs_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='alarm_logs',
            name='created',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
