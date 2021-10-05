import {NgModule} from '@angular/core';
import {
  NbActionsModule, NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbMenuModule, NbRadioModule, NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {InfoModule} from './e-commerce/info.module';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HistoriqueComponent} from './historique/historique.component';
import {FacturesComponent} from './factures/factures.component';
import {AddDeviceComponent} from './add-device/add-device.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {HighchartsChartModule} from 'highcharts-angular';
import {AlarmComponent} from './alarm/alarm.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ShowFactureComponent} from './factures/show-facture/show-facture.component';
import {ListFactureComponent} from './factures/list-facture/list-facture.component';
import { ConfigurationAppareilComponent } from './configurationAppareil/configuration-appareil.component';
import { PredictHourFactureComponent } from './factures/predict-hour-facture/predict-hour-facture.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    InfoModule,
    MiscellaneousModule,
    NbCardModule,
    Ng2SmartTableModule,
    HighchartsChartModule,
    NbInputModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbRadioModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,

  ],
  declarations: [
    PagesComponent,
    HistoriqueComponent,
    FacturesComponent,
    AddDeviceComponent,
    AlarmComponent,
    ShowFactureComponent,
    ListFactureComponent,
    ConfigurationAppareilComponent,
    PredictHourFactureComponent,
  ],
  exports: [
  ],
})
export class PagesModule {
}
