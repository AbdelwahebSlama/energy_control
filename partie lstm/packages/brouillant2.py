import logging
import threading
import time
import queue
import random
import pandas as pd
import os
import datetime

que = queue.Queue()
que1 = queue.Queue()
init_path = os.getcwd()
path_to_results = init_path
dataset = pd.read_csv(
    path_to_results + '\\datasets\\dataset_final.csv', sep=",")


def generateur(vr):
    h = random.randint(2000, 15000)
    date = datetime.datetime.now()
    #date = date.strftime("%d/%m/%Y %H:%M:%S")
    data = {"date": date, "cons_glbal": h}
    return data


def isrunning(data):
    avgheure = dataset.groupby(['hour', 'day', 'month'])[
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

def handler():
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(relativeCreated)6d %(threadName)s %(message)s"
    )
    info = {"stop": False}
    i = 0
    while True:
        try:
            logging.debug('main thread ')
            time.sleep(5)
            thraed = threading.Thread(target=lambda q, arg1: q.put(
            generateur(arg1)), args=(que, i))
            thraed.start()
            i += 1
            result = que.get()
            thraed2 = threading.Thread(target=lambda q2, arg1: q2.put(
            isrunning(arg1)), args=(que1, result))
            thraed2.start()
            result2   = que1.get()
            print(result, result2)
        except KeyboardInterrupt:
            info["stop"] = True
            logging.debug('Stopping')
            break
 
    thraed.join()
    thraed2.join()


handler()
