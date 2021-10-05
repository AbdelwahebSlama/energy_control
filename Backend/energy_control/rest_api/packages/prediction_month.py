import pickle as pkl
from keras.models import load_model
from pickle import load
import numpy as np
from sklearn.preprocessing import MinMaxScaler

class predectorMonth :
    def __init__(self):
        self.my_loaded_model = load_model('rest_api/model/prediction_month.h5')
        self.scaler_load = load(open('rest_api/model/scaler_month.pkl', 'rb'))
        self.scaler_load_output =  load(open('rest_api/model/scalerYmonth.pkl', 'rb'))

    def predict(self, input_data):
        #load models
        # my_loaded_model = load_model('../models/prediction.h5')
        #scale data input
        input_data_scaled = self.scale_input(input_data)
        # predict data
        predictions = self.my_loaded_model.predict(input_data_scaled)
        predictions_transform = self.transform_output(predictions)
        return predictions_transform

    def scale_input(self, input_data):
        #load model scaler
        x_input = np.expand_dims(np.array(input_data), axis=0)
        input_MinMax = self.scaler_load.transform(x_input)
        input_MinMax = input_MinMax.reshape(1,12,-1)
        return input_MinMax


    def transform_output(self, input_data):
        tranformed_data = self.scaler_load_output.inverse_transform(input_data)
        return tranformed_data

