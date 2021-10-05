import {Component, OnInit} from '@angular/core';
import {FacturService} from '../../../services/facture/factur.service';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'ngx-show-facture',
  templateUrl: './show-facture.component.html',
  styleUrls: ['./show-facture.component.scss'],
})
export class ShowFactureComponent implements OnInit {
  prediction: number;
  isMonth = true;
  isHour = false;

  constructor(private factureService: FacturService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getPredictMonth().subscribe(
      (res) => {
        this.prediction = res['results'];
      },
      );
  }

  addPrediction() {
    this.factureService.getIsShowFactur(false);
    this.factureService.getIsListFactur(true);
    this.factureService.getisHour(false);

  }

}
