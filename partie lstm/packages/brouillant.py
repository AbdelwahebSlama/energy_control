
from threading import Timer
import time
import random
import copy
from alarm import *
import os
#from datetime import date
#from datetime import datetime
import datetime
import pandas as pd
import threading

init_path = os.getcwd()
path_to_results = init_path


class RepeatingTimer(object):

    def __init__(self, interval, function, *args, **kwargs):
        super(RepeatingTimer, self).__init__()
        threading.Thread.__init__(self)
        self.args = args
        self.kwargs = kwargs
        self.function = function
        self.interval = interval
        self.dataset = pd.read_csv(
        path_to_results + '\\datasets\\dataset_final.csv', sep=",")

    def Handler(self):
        if self.interval:
            data = self.function(*self.args, **self.kwargs)
            Timer(self.interval, self.Handler, ).start()
        message = self.isRunning(data)
        status = self.getCurrentState()
        response = {"data": message, "status": status}
        return response

    def isRunning(self, data):
        avgheure = self.dataset.groupby(['hour', 'day', 'month'])[
            'cons_glbal'].mean()
        month = data['date'].month
        day = data['date'].strftime("%A")
        hour = data['date'].hour
        avgheure = dict(avgheure)
        avg_cons = avgheure[(hour, day, month)]

        if(avg_cons < data['cons_glbal']):
          return "depassement de seuile"
        else:
          return "consommation normale"

    def getCurrentState(self):
        if threading.Thread.is_alive(self) is True:
           return "active"
        else:
            return "disactive"

    def start(self):
        print(self.Handler())

    def stop(self):
        self.interval = False



""" alarm = AlarmHandler()
def printer():
    # print('donner la consommation')
    while True:
        h = random.randint(2000, 15000)
        print(h)
        date = datetime.datetime.now()
        #date = date.strftime("%d/%m/%Y %H:%M:%S")
        data = {"date": date, "cons_glbal": h}
        print('je suis printer function', alarm.Handler(data))
        time.sleep(4)
 """

# for i in range(0, 10):
 #   print("programme ", i)

def printer():
    h = random.randint(2000, 15000)
    print(h)
    date = datetime.datetime.now()
    #date = date.strftime("%d/%m/%Y %H:%M:%S")
    data = {"date": date, "cons_glbal": h}
    return data

ob = RepeatingTimer(5, printer)
ob.start()

#ob.join()