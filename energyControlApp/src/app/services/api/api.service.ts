import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import APIS from '../../../../src/app/Globals';
import {ArchiveEnergie} from '../../models/archive-energie';
import {AlarmLog} from '../../models/alarm-log';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  device_id = new Subject<number>();
  token = localStorage.getItem('token');
  headers = {'content-Type': 'application/json', Authorization: 'Token ' + this.token};

  constructor(private http: HttpClient) {
  }

  getDeviceId(id: number): void {
    this.device_id.next(id);
  }

  getHistoriqueChart(date: string): Observable<any> {
    return this.http.get<any>(APIS.API_historiqueChart + '?date=' + date, {headers: this.headers});
  }

  getHistorique(): Observable<ArchiveEnergie[]> {
    return this.http.get<ArchiveEnergie[]>(APIS.API_historique, {headers: this.headers});
  }

  // streaming chart data
  getStreaming(): Observable<any> {
    return this.http.get<any>(APIS.API_streaming, {headers: this.headers});
  }

  // historique alarme
  getListalarme(): Observable<AlarmLog[]> {
    return this.http.get<AlarmLog[]>(APIS.API_listalarme, {headers: this.headers});
  }

  // satus alarme
  getStatusAlarme(): Observable<any> {
    return this.http.get<any>(APIS.APIS_GgetAlarmStatus, {headers: this.headers});
  }

  // alarme chart data
  getChartAlarme(): Observable<any> {
    return this.http.get<any>(APIS.API_chartAlarme, {headers: this.headers});
  }

  // APIS_Ajouter device
  postAjoutdevice(credentials): Observable<any> {
    return this.http.post<any>(APIS.APIS_AddDevice, credentials, {headers: this.headers});
  }

  // liste de devices
  getListedevice(): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Token', token);
    const headers = {headers: header};
    return this.http.get<any>(APIS.APIS_GgetListDevice, {headers: this.headers});
  }

  // get Conso get per Device
  getConsoDevice(id: number): Observable<any> {
    return this.http.get<any>(APIS.APIS_GgetConsoDevice + id + '/');
  }
  // get Conso get per Device
  getListDeviceId(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/listDeviceId/' , {headers: this.headers});
  }


  // modofier etat device
  putModifierEtatdevice(credentials, id): Observable<any> {
    return this.http.post<any>(APIS.APIS_ModifEtatDevice + id + '/', credentials);
  }

  // add device config
  putConfiguration(credentials): Observable<any> {
    const body = JSON.stringify(credentials);
    return this.http.post<any>(APIS.APIS_GetDevicePerID, body, {headers: this.headers});
  }

  // get device per ID
  getDevicePerID(id: number): Observable<any> {
    return this.http.get<any>(APIS.APIS_GetDevicePerID + '?id=' + id, {headers: this.headers});
  }

  getListegauge(): Observable<any> {
    return this.http.get<any>(APIS.API_gauge);
  }

  getDeppasmentDevice(): Observable<any> {
    return this.http.get<any>(APIS.API_deppasmentDevice);
  }

  // modifier etat alarme
  putModifierEtatalarme(credentials, id): Observable<any> {
    return this.http.put<any>(APIS.API_modifAlarme + id + '/', credentials);
  }

  getEtatAlarme(): Observable<any> {
    return this.http.get<any>(APIS.API_etatAlarme);
  }

  getlistpredictions(): Observable<any> {
    return this.http.get<any>(APIS.API_listpredictions);
  }
  getPredictMonth(): Observable<any> {
    return this.http.get<any>(APIS.APIS_PredictMonth, {headers: this.headers});
  }

  postPredict(nbH: number): Observable<any> {
    return this.http.get<any>(APIS.API_predict + '?time=' + nbH, {headers: this.headers});
  }

}
