import {Component, OnInit} from '@angular/core';
import {FacturService} from '../../../services/facture/factur.service';
import {ApiService} from '../../../services/api/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-predict-hour-facture',
  templateUrl: './predict-hour-facture.component.html',
  styleUrls: ['./predict-hour-facture.component.scss'],
})
export class PredictHourFactureComponent implements OnInit {

  lisprediction34: number[] = [];
  lisprediction192: number[] = [];
  lisprediction243: number[] = [];
  lisprediction246: number[] = [];
  lisprediction253: number[] = [];
  t: number[] = [1, 1, 1, 1, 2, 2, 3, 5, 4];
  id: number;
  nbHeure: number;

  constructor(private factureService: FacturService, private apiService: ApiService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.nbHeure = Number(this.route.snapshot.paramMap.get('nbHeur'));
    this.apiService.postPredict(this.nbHeure).subscribe(
      (data) => {
        for(let i in data['34']){
          this.lisprediction34.push(data['34'][i].toFixed(2))
        }
        for(let i in data['192']){
          this.lisprediction192.push(data['192'][i].toFixed(2))
        }
        for(let i in data['243']){
          this.lisprediction243.push(data['243'][i].toFixed(2))
        }
        for(let i in data['246']){
          this.lisprediction246.push(data['246'][i].toFixed(2))
        }
        for(let i in data['253']){
          this.lisprediction253.push(data['253'][i].toFixed(2))
        }

      },
    );

  }

  addPrediction() {
    this.factureService.getIsShowFactur(false);
    this.factureService.getIsListFactur(true);
    this.factureService.getisHour(false);

  }

}
