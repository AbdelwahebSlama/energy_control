import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="changeEtatAlarm()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ color }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ on ? '' : 'OFF' }}
          <br>
          <br>
          <p class="text-center">{{message}}</p>
        </div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent implements OnInit {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  status = ['warning', 'danger', 'success'];
  color = 'success'
  listeAlarm: any;
  message = '';
  id;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    // this.apiService.getStatusAlarme().subscribe(
    //   (data) => {
    //     for (let i in data['data']) {
    //       if (data['data'][i] === 'high_alarm') {
    //         this.color = 'danger';
    //         this.message = 'vous avez un haute consommation dans à l\'appareil ' + i;
    //         if (this.id) {
    //           clearInterval(this.id);
    //         }
    //         break;
    //       }
    //       if (data['data'][i] === "low_alarm") {
    //         this.color = 'warning';
    //         this.message = 'vous avez un deppassement consommation dans à l\'appareil ' + i;
    //         if (this.id) {
    //           clearInterval(this.id);
    //         }
    //         break;
    //       }
    //       if (data['data'][i] === "low_warning") {
    //         this.color = 'warning';
    //         this.message = 'vous avez un bas consommation dans à l\'appareil ' + i;
    //         if (this.id) {
    //           clearInterval(this.id);
    //         }
    //         break;
    //       }
    //       if (data['data'][i] === "high_warning") {
    //         this.color = 'danger';
    //         this.message = 'vous avez un deppassement consommation dans à l\'appareil ' + i;
    //         if (this.id) {
    //           clearInterval(this.id);
    //         }
    //         break;
    //       }
    //     }
    //   },
    // );
    this.id = setInterval(() => {
      this.listStatusAlarm();
    }, 10000);
  }

  listStatusAlarm() {
    this.apiService.getStatusAlarme().subscribe(
      (data) => {
        for (let i in data['data']) {
          if (data['data'][i] === 'high_alarm') {
            this.color = 'danger';
            this.message = 'vous avez un haute consommation dans à l\'appareil ' + i;
            if (this.id) {
              clearInterval(this.id);
            }
            break;
          }
          if (data['data'][i] === "low_alarm") {
            this.color = 'warning';
            this.message = 'vous avez un deppassement consommation dans à l\'appareil ' + i;
            if (this.id) {
              clearInterval(this.id);
            }
            break;
          }
          if (data['data'][i] === "low_warning") {
            this.color = 'warning';
            this.message = 'vous avez un bas consommation dans à l\'appareil ' + i;
            if (this.id) {
              clearInterval(this.id);
            }
            break;
          }
          if (data['data'][i] === "high_warning") {
            this.color = 'danger';
            this.message = 'vous avez un deppassement consommation dans à l\'appareil ' + i;
            if (this.id) {
              clearInterval(this.id);
            }
            break;
          }
        }
      },
    );
  }

  changeEtatAlarm(): void {
    this.on = !this.on;
    this.message = '';
    this.color = 'success';
    if (this.on) {
      this.id = setInterval(() => {
        this.listStatusAlarm();
        console.log('tetst intervale');
      }, 3000);
    }
  }
}
