import {Component, Input, OnInit, Output} from '@angular/core';
import {NbDateService} from '@nebular/theme';
import {Prediction} from '../../models/prediction';
import {HistoriqueService} from '../../services/historiques/historique.service';
import {FacturService} from '../../services/facture/factur.service';

@Component({
  selector: 'ngx-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss'],
})
export class FacturesComponent implements OnInit {
  isShowFactur: boolean = false;
  isListFactur: boolean = true;
  isHour: boolean = false;

  min: Date;
  max: Date;
  predcitions: Prediction[];
  page = 1;
  count = 0;
  tableSize = 4;
  tableSizes = [3, 6, 9, 12];
  selectedValue: number;
  item: Prediction = null;

  constructor(protected dateService: NbDateService<Date>,
              private historiqueService: HistoriqueService, private facturService: FacturService) {
    this.min = this.dateService.addDay(this.dateService.today(), 0);
    this.max = this.dateService.addDay(this.dateService.today(), 30);
    this.facturService.isShowFactur.subscribe(
      (val) => {
        this.isShowFactur = val;
      },
    );
    this.facturService.isListFactur.subscribe(
      (val) => {
        this.isListFactur = val;
      },
    );

    this.facturService.isHour.subscribe(
      (val) => {
        this.isHour = val;
      },
      );
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.predcitions = this.historiqueService.getPrediction();
  }


  onTableDataChange(event) {
    this.page = event;
    this.fetchPosts();
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }


}
