import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {ApiService} from '../../services/api/api.service';

declare const main: any;

@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chardata34: any[] = [];
  chardata192: any[] = [];
  chardata243: any[] = [];
  chardata246: any[] = [];
  chardata253: any[] = [];
  chartOptions: any;
  id;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
   this.id = setInterval(() => {
     this.apiService.getStreaming().subscribe(
       (data) => {
         this.chardata34.push(Number(data['34'].cons_glbal.toFixed(2)));
         this.chardata192.push(Number(data['192'].cons_glbal.toFixed(2)));
         this.chardata243.push(Number(data['243'].cons_glbal.toFixed(2)));
         this.chardata246.push(Number(data['246'].cons_glbal.toFixed(2)));
         this.chardata253.push(Number(data['253'].cons_glbal.toFixed(2)));

         this.chartOptions = {
           series: [
             {
               name: 'appareil 34',
               data: this.chardata34,
             },
             {
               name: 'appareil 192',
               data: this.chardata192,
             },
             {
               name: 'appareil 243',
               data: this.chardata243,
             },
             {
               name: 'appareil 246',
               data: this.chardata246,
             },
             {
               name: 'appareil 253',
               data: this.chardata253,
             },
           ],
           chart: {
             type: 'line',
             zoomType: 'x',
           },
           title: {
             text: 'Le Streaming De Consommation ',
           },
         };
       },
     );
   } , 10000);

  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
