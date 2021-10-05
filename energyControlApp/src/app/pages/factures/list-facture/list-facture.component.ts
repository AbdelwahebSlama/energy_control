import {Component, OnInit, Output} from '@angular/core';
import {Prediction} from '../../../models/prediction';
import {NbDateService} from '@nebular/theme';
import {HistoriqueService} from '../../../services/historiques/historique.service';
import {FacturService} from '../../../services/facture/factur.service';
import {ApiService} from '../../../services/api/api.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.scss'],
})
export class ListFactureComponent implements OnInit {
  min: Date;
  max: Date;
  predcitions: Prediction[];
  page = 1;
  count = 0;
  tableSize = 4;
  tableSizes = [3, 6, 9, 12];
  selectedValue: number;
  item: Prediction = null;
  nbrHeur: number;

  constructor(protected dateService: NbDateService<Date>,
              private historiqueService: HistoriqueService, private facturService: FacturService,
              private apiService: ApiService, private router: Router) {
    this.min = this.dateService.addDay(this.dateService.today(), 0);
    this.max = this.dateService.addDay(this.dateService.today(), 30);
  }

  ngOnInit(): void {
    this.fetchPosts();
    // this.apiService.getlistpredictions().subscribe(
    //   (data) => {
    //     console.log('prediction ', data);
    //   },
    // );
    this.facturService.getnbrHeurSubject(this.nbrHeur);
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

  predict() {
   this.router.navigate(['pages/factures/prediction', this.nbrHeur]);
    // this.facturService.getisHour(true);
    // this.facturService.getIsListFactur(false);
    // this.facturService.getIsShowFactur(false);
  }

  predictMonth() {
    this.facturService.getisHour(false);
    this.facturService.getIsListFactur(false);
    this.facturService.getIsShowFactur(true);
  }
}
