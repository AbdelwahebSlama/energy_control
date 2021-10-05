import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {HistoriqueService} from '../../services/historiques/historique.service';
import {ApiService} from "../../services/api/api.service";

@Component({
  selector: 'ngx-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
})
export class HistoriqueComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      id_device: {
        title: 'id_device',
        type: 'number',
      },
      date: {
        title: 'Date',
        type: 'Date',
      },
      cons_en_L1: {
        title: 'Cons en L1',
        type: 'number',
      },
      cons_en_L2: {
        title: 'Cons_en_L2',
        type: 'number',
      },
      cons_en_L3: {
        title: 'Cons_en_L3',
        type: 'number',
      },
      cons_glbal: {
        title: 'cons_glbal',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private historiqueService: HistoriqueService, private apiService: ApiService) {
    const data = this.historiqueService.getData();
    // this.source.load(data);
    this.apiService.getHistorique().subscribe(
      (data) => {
        // console.log(data['data']);
        this.source.load(data['data']);
      },
    );
  }
  ngOnInit(): void {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
