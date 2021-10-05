import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService, NbWindowService} from '@nebular/theme';
import {Temperature, TemperatureHumidityData} from '../../../@core/data/temperature-humidity';
import {takeWhile} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {ApiService} from '../../../services/api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy, OnInit {

  private alive = true;
  @Input() device;

  temperatureData: Temperature;
  temperature: number ;
  valuePrediction: number;
  temperatureOff = false;
  temperatureMode = 'cool';
  humidityData: Temperature;
  humidity: number;
  theme: any;
  status: string;

  constructor(private themeService: NbThemeService,
              private temperatureHumidityService: TemperatureHumidityData,
              private windowService: NbWindowService,
              private router: Router,
              private apiService: ApiService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        this.theme = config.variables.temperature;
      });

    forkJoin(
      this.temperatureHumidityService.getTemperatureData(),
      this.temperatureHumidityService.getHumidityData(),
    )
      .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
        this.temperatureData = temperatureData;
        this.humidityData = humidityData;
        this.humidity = this.humidityData.value;
      });
  }

  ngOnInit(): void {
    this.temperature = this.device[1].cons.cons_glbal.toFixed(2);
    // this.valuePrediction = Number( (Number(this.temperature ) + (Number(this.temperature ) * 0.008) )).toFixed(2);
    this.valuePrediction = (this.device[1].cons.cons_glbal + 175.36).toFixed(2);
    // this    this.valuePrediction
    this.status = this.device[1].alarm;
  }

  openWindowForm(id: number): void {
    this.router.navigate(['/pages/configuartion']);
    // this.windowService.open(WindowFormComponent, {title: `Paramétrage Alarme`});
  }


  ngOnDestroy() {
    this.alive = false;
  }
}
