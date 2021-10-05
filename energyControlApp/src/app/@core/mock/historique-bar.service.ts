import {Injectable} from '@angular/core';
import {PeriodsService} from './periods.service';
import {ProfitChart, ProfitChartData} from '../data/profit-chart';
import {ApiService} from '../../services/api/api.service';

@Injectable()
export class HistoriqueBarService extends ProfitChartData {
  data1 = [10800.8186794183, 10988.2034338621, 10790.6817814754, 10665.798723124, 10781.147193693, 13093.7491124212,
    11409.6461152518, 11272.0700924028, 11150.4360376481, 10062.4854833757, 9397.6895969524, 9586.2758274527,
  ];
  data2 = [9359.4590191413, 9535.2923756741, 9519.1776233375, 9663.4305501114, 9947.2689299881, 10701.5191651829,
    11171.91850379, 10016.3993494442, 10200.9214217072, 9760.1172231011, 10067.8299544042, 9957.9728443052,
  ];
  data3 = [9488.5631308676, 9590.5875782918, 9392.0152708412, 9973.1075887044, 9594.5784681532, 9699.283070204,
    9770.8756998698, 9664.5885579427, 9763.7090888129, 9689.3601467556, 9555.3338941786, 9359.0701382167,
  ];
  data4 = [9488.5631308676, 9590.5875782918, 9392.0152708412, 9973.1075887044, 9594.5784681532, 9699.283070204,
    9770.8756998698, 9664.5885579427, 9763.7090888129, 9689.3601467556, 9555.3338941786, 9359.0701382167,
  ];
  chardata34: any[] = [];
  chardata192: any[] = [];
  chardata243: any[] = [];
  chardata246: any[] = [];
  chardata253: any[] = [];
  // day variable
  chardata34day: any[] = [];
  chardata192day: any[] = [];
  chardata243day: any[] = [];
  chardata246day: any[] = [];
  chardata253day: any[] = [];

  // month variable
  chardata34month: any[] = [];
  chardata192month: any[] = [];
  chardata243month: any[] = [];
  chardata246month: any[] = [];
  chardata253month: any[] = [];


  private year = [
    '2019',
    '2020',
    '2021',
  ];

  private data = {};

  constructor(private period: PeriodsService, private apiService: ApiService) {
    super();
    this.data = {
      week: this.getDataForWeekPeriod(),
      month: this.getDataForMonthPeriod(),
      year: this.getDataForYearPeriod(),
    };
  }

  private getDataForWeekPeriod(): ProfitChart {
    const nPoint = this.period.getWeeks().length;
    this.apiService.getHistoriqueChart('day').subscribe(
      (data) => {
        // console.log('console log data week ');
        for (let i in data['34']) {
          this.chardata34day.push(data['34'][i].toFixed(3));
        }
        for (let i in data['192']) {
          this.chardata192day.push(data['192'][i].toFixed(3));
        }
        for (let i in data['243']) {
          this.chardata243day.push(data['243'][i].toFixed(3));
        }
        for (let i in data['246']) {
          this.chardata246day.push(data['246'][i].toFixed(3));
        }
        for (let i in data['253']) {
          this.chardata253day.push(data['253'][i].toFixed(3));
        }
      },
    );
    return {
      chartLabel: this.period.getWeeks(),
      data: [
        this.chardata34day,
        this.chardata192day,
        this.chardata243day,
        this.chardata246day,
        this.chardata253day,
      ],
    };
  }

  private getDataForMonthPeriod(): ProfitChart {
    const nPoint = this.period.getMonths().length;

    this.apiService.getHistoriqueChart('month').subscribe(
      (data) => {
        for (let i in data['34']) {
          this.chardata34month.push(data['34'][i].toFixed(3));
        }
        for (let i in data['192']) {
          this.chardata192month.push(data['192'][i].toFixed(3));
        }
        for (let i in data['243']) {
          this.chardata243month.push(data['243'][i].toFixed(3));
        }
        for (let i in data['246']) {
          this.chardata246month.push(data['246'][i].toFixed(3));
        }
        for (let i in data['253']) {
          this.chardata253month.push(data['253'][i].toFixed(3));
        }
      },
    );
    return {
      chartLabel: this.period.getMonths(),
      data: [
        this.chardata34month,
        this.chardata192month,
        this.chardata243month,
        this.chardata246month,
        this.chardata253month,
      ],
    };
  }

  private getDataForYearPeriod(): ProfitChart {
    const nPoint = this.year.length;
    this.apiService.getHistoriqueChart('year').subscribe(
      (data) => {
        // data device 34
        this.chardata34.push(data['34']['2019'].toFixed(3));
        this.chardata34.push(data['34']['2020'].toFixed(3));
        this.chardata34.push(data['34']['2021'].toFixed(3));

        // data device 192
        this.chardata192.push(data['192']['2019'].toFixed(3));
        this.chardata192.push(data['192']['2020'].toFixed(3));
        this.chardata192.push(data['192']['2021'].toFixed(3));

        // data device 243
        this.chardata243.push(data['243']['2019'].toFixed(3));
        this.chardata243.push(data['243']['2020'].toFixed(3));
        this.chardata243.push(data['243']['2021'].toFixed(3));

        // data device 246
        this.chardata246.push(data['246']['2019'].toFixed(3));
        this.chardata246.push(data['246']['2020'].toFixed(3));
        this.chardata246.push(data['246']['2021'].toFixed(3));

        // data device 253
        this.chardata253.push(data['253']['2019'].toFixed(3));
        this.chardata253.push(data['253']['2020'].toFixed(3));
        this.chardata253.push(data['253']['2021'].toFixed(3));
      },
    );

    return {
      chartLabel: this.year,
      data: [
        this.chardata34,
        this.chardata192,
        this.chardata243,
        this.chardata246,
        this.chardata253,
      ],
    };
  }
  getProfitChartData(period: string): ProfitChart {
    return this.data[period];
  }
}
