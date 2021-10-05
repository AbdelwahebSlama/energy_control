import random


class Sensors :
    @staticmethod
    def get_readings(device_id):
        readings = {}
        readings["cons_en_L1"] = random.randint(600,801) *1.1
        readings["cons_en_L2"] = random.randint(500,801) *1.1
        readings["cons_en_L3"] = random.randint(400,801) *1.1
        readings["en_L1"] = readings["cons_en_L1"]
        readings["en_L2"] = readings["cons_en_L2"]
        readings["en_L3"] = readings["cons_en_L3"]
        readings["cons_glbal"] = readings["cons_en_L1"] + readings["cons_en_L2"] + readings["cons_en_L3"]
        readings["min_cosfi_L1"] = random.random()
        readings["max_cosfi_L1"] = random.random()
        readings["moy_cosfi_L1"] = random.random()
        readings["min_cosfi_L2"] = random.random()
        readings["max_cosfi_L2"] = random.random()
        readings["moy_cosfi_L2"] = random.random()
        readings["min_cosfi_L3"] = random.random()
        readings["max_cosfi_L3"] = random.random()
        readings["moy_cosfi_L3"] = random.random()

        return readings