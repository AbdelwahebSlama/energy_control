import {Injectable} from '@angular/core';
import {ArchiveEnergie} from '../../models/archive-energie';
import {Prediction} from '../../models/prediction';
import {Alarme} from '../../models/alarme';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class HistoriqueService {
  data: ArchiveEnergie[] = [
    new ArchiveEnergie(1, new Date('10/03/2021'), 34, 1000, 1000, 2000),
    new ArchiveEnergie(1, new Date('10/03/2021'), 34, 1000, 1000, 2000),
    new ArchiveEnergie(1, new Date('10/03/2021'), 34, 1000, 1000, 2000),
  ];
  predictions: Prediction [] = [
    new Prediction(1, new Date('10/05/2021'), 4002),
    new Prediction(1, new Date('10/05/2021'), 4002),
    new Prediction(1, new Date('10/05/2021'), 4002),
    new Prediction(1, new Date('10/05/2021'), 4002),
    new Prediction(1, new Date('10/05/2021'), 4002),
    new Prediction(1, new Date('10/05/2021'), 4002),
    new Prediction(1, new Date('10/05/2021'), 4002),
  ];
  alarmes: Alarme [] = [
    new Alarme(1, 'high alarm', 400),
    new Alarme(1, 'high alarm', 400),
    new Alarme(1, 'high alarm', 400),
    new Alarme(1, 'high alarm', 400),
    new Alarme(1, 'high alarm', 400),
    new Alarme(1, 'high alarm', 400),
    new Alarme(1, 'high alarm', 400),
  ];

  constructor(private apiService: ApiService) {
  }

  getData() {
    return this.data;
  }

  getPrediction() {
    return this.predictions;
  }

  getAlarm() {
    return this.alarmes;
  }
}
