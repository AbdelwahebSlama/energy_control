



class plot :
    def __init__(self):
        pass

    def get_curve(self, data,label, label1):
        #label like 'month' 'hour' 'day' 'year' 
        curve = []
        curve = data.groupby([label])[label1].mean()
        return curve
