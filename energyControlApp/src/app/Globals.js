const API_LOGIN = 'http://localhost:8000/api/login/';
const API_LogOut = 'http://localhost:8000/api/logout/';
const API_historiqueChart = 'http://127.0.0.1:8000/api/historiqueChart/';
const API_historique = 'http://localhost:8000/api/historique/';
const API_streaming = 'http://127.0.0.1:8000/api/streaming/';
const API_device = 'http://127.0.0.1:8000/pfe/device/';
const API_configuration = 'http://127.0.0.1:8000/pfe/configuration/';
const API_gauge = 'http://127.0.0.1:8000/pfe/gauge/';
const API_listalarme = 'http://127.0.0.1:8000/api/listalarme/';
const API_modifAlarme = 'http://127.0.0.1:8000/api/modifAlarme/';
const API_chartAlarme = 'http://127.0.0.1:8000/api/alarmChart/';
const API_deppasmentDevice = 'http://127.0.0.1:8000/api/deppasmentDevice/';
const API_etatAlarme = 'http://127.0.0.1:8000/api/listpredictions/';
const API_listpredictions = 'http://127.0.0.1:8000/api/listpredictions/';
const API_predict = 'http://127.0.0.1:8000/api/predict/';
// const API_predict = 'http://127.0.0.1:8000/alarmC;
const APIS_ModifEtatDevice = 'http://127.0.0.1:8000/api/device/modifEtat/';
const APIS_ConfigDevice = 'http://127.0.0.1:8000/api/device/configDevice/';
const APIS_GetDevicePerID = 'http://127.0.0.1:8000/api/device/getDevicePerId/';
const APIS_GgetConsoDevice = 'http://127.0.0.1:8000/api/device/getConsoDevice/';
const APIS_GgetListDevice = 'http://127.0.0.1:8000/api/device/getListDevices/';
const APIS_GgetAlarmStatus = 'http://localhost:8000/api/alarmStatus/';
const APIS_AddDevice = 'http://localhost:8000/api/addDevice/';
const APIS_PredictMonth = 'http://localhost:8000/api/predictMonth/';


export default {
  API_historiqueChart: API_historiqueChart,
  API_historique: API_historique,
  API_streaming: API_streaming,
  API_device: API_device,
  API_configuration: API_configuration,
  API_gauge: API_gauge,
  API_listalarme: API_listalarme,
  API_modifAlarme: API_modifAlarme,
  API_chartAlarme: API_chartAlarme,
  API_deppasmentDevice: API_deppasmentDevice,
  API_etatAlarme: API_etatAlarme,
  API_listpredictions: API_listpredictions,
  API_predict: API_predict,
  api_Login: API_LOGIN,
  API_LogOut: API_LogOut,
  APIS_ModifEtatDevice: APIS_ModifEtatDevice,
  APIS_ConfigDevice: APIS_ConfigDevice,
  APIS_GetDevicePerID: APIS_GetDevicePerID,
  APIS_GgetConsoDevice: APIS_GgetConsoDevice,
  APIS_GgetListDevice: APIS_GgetListDevice,
  APIS_GgetAlarmStatus: APIS_GgetAlarmStatus,
  APIS_AddDevice: APIS_AddDevice,
  APIS_PredictMonth:APIS_PredictMonth,
}
