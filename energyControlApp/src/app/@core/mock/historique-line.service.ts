import {Injectable} from '@angular/core';
import {PeriodsService} from './periods.service';
import {OrdersChart, OrdersChartData} from '../data/orders-chart';
import {ApiService} from '../../services/api/api.service';

@Injectable()
export class HistoriqueLineService extends OrdersChartData {

  private year = [
    '2019',
    '2020',
    '2021',
  ];
  chardata34: any[] = [];
  chardata192: any[] = [];
  chardata243: any[] = [];
  chardata246: any[] = [];
  chardata253: any[] = [];

  // month variable
  chardata34month: any[] = [];
  chardata192month: any[] = [];
  chardata243month: any[] = [];
  chardata246month: any[] = [];
  chardata253month: any[] = [];

  // day variable
  chardata34day: any[] = [];
  chardata192day: any[] = [];
  chardata243day: any[] = [];
  chardata246day: any[] = [];
  chardata253day: any[] = [];


  private data = {};

  constructor(private period: PeriodsService, private apiService: ApiService) {
    super();
    this.data = {
      week: this.getDataForWeekPeriod(),
      month: this.getDataForMonthPeriod(),
      year: this.getDataForYearPeriod(),
    };
  }

  private getDataForWeekPeriod(): OrdersChart {
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
      chartLabel:  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      linesData: [
        this.chardata34day,
        this.chardata192day,
        this.chardata243day,
        this.chardata246day,
        this.chardata253day,
      ],
    };
  }

  private getDataForMonthPeriod(): OrdersChart {
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
      });
    return {
      chartLabel: [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec',
      ],
      linesData: [
        this.chardata34month,
        this.chardata192month,
        this.chardata243month,
        this.chardata246month,
        this.chardata253month,
      ],
    };
  }

  private getDataForYearPeriod(): OrdersChart {
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
      linesData: [
        this.chardata34,
        this.chardata192,
        this.chardata243,
        this.chardata246,
        this.chardata253,
      ],
    };
  }

  getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }

  getOrdersChartData(period: string): OrdersChart {
    return this.data[period];
  }
}
