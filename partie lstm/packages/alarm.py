import datetime
import threading
import os
import pandas as pd
from threading import Timer



init_path = os.getcwd()
path_to_results = init_path 


class AlarmHandler(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.dataset = pd.read_csv(
            path_to_results + '\\datasets\\dataset_final.csv', sep=",")
        #print(self.dataset)

    def Handler(self, data):
        #self.Start()
        #self.Join()
        message = self.isRunning(data)
        status = self.getCurrentState()
        #self.Stop()
        response = {"data": message, "status": status}
        return response

    def isRunning(self, data):
        avgheure = self.dataset.groupby(['hour', 'day', 'month'])['cons_glbal'].mean()
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

    def Start(self):
        self.start()

    def Join(self):
        self.join()

    def Stop(self):
        self.stop()

    def ConfigParams(self):
        pass


#today = datetime.datetime.now()
#c = AlarmHandler()
#data = {"date": today, "cons_glbal": 15444000}
#print(c.Handler(data))
