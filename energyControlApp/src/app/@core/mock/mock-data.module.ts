import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { SmartTableService } from './smart-table.service';
import { HistoriqueLineService } from './historique-line.service';
import { HistoriqueBarService } from './historique-bar.service';
import { PeriodsService } from './periods.service';
import { HistoriqueLineChartService } from './historique-line-chart.service';
import { HistoriqueBarAnimationChartService } from './historique-bar-animation-chart.service';
import { DevicesService } from './devices.service';
import { SolarService } from './solar.service';

const SERVICES = [
  UserService,
  SmartTableService,
  HistoriqueLineService,
  HistoriqueBarService,
  PeriodsService,
  HistoriqueLineChartService,
  HistoriqueBarAnimationChartService,
  DevicesService,
  SolarService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
