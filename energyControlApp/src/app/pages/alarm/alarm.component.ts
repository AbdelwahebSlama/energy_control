import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {HistoriqueService} from '../../services/historiques/historique.service';
import * as Highcharts from 'highcharts';
import {ApiService} from '../../services/api/api.service';


@Component({
  selector: 'ngx-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
})
export class AlarmComponent implements OnInit {

  historiqueAlarme: any [] = [];
  reelAlarme: number [] = [];
  predictAlarme: number [] = [];
  chartOptions: Highcharts.Options;

  settings = {
    actions: false,
    columns: {
      date: {
        title: 'ID',
        type: 'Date',
      },
      device_id: {
        title: 'device_id',
        type: 'number',
      },
      log: {
        title: 'log',
        type: 'string',
      },
      log_level: {
        title: 'log_level',
        type: 'string',
      },
      value: {
        title: 'Value',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private historiqueService: HistoriqueService, private apiService: ApiService) {
    const data = this.historiqueService.getAlarm();
    this.apiService.getListalarme().subscribe(
      (data) => {
        this.source.load(data['data'].reverse());
      },
    );
  }

  highcharts = Highcharts;
  // chartOptions: Highcharts.Options;

  ngOnInit(): void {
    this.apiService.getChartAlarme().subscribe(
      (data) => {
        for (let i in data['real']) {
          this.reelAlarme.push(data['real'][i]);
        }
        for (let i in data['predicted']) {
          this.predictAlarme.push(data['predicted'][i]);
        }

      this.chartOptions  = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Histogramme de réel et  prévision alarme',
          },
          xAxis: {
            categories: ['0h', '1h', '2h', '3h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h',
              '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Nombre d\'arlme',
            },
            labels: {
              overflow: 'justify',
            },
          },
          tooltip: {
            valueSuffix: '',
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
              },
            },
          },
          series: [{
            type: undefined,
            name: 'alarme réel',
            data: this.reelAlarme,
          }, {
            type: undefined,
            name: 'alarme prévisé',
            data: this.predictAlarme,
          },
          ],
        };
      },
    );
  }


}
