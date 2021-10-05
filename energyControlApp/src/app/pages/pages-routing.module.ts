import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoComponent } from './e-commerce/info.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {HistoriqueComponent} from './historique/historique.component';
import {FacturesComponent} from './factures/factures.component';
import {AddDeviceComponent} from './add-device/add-device.component';
import {AlarmComponent} from './alarm/alarm.component';
import {ConfigurationAppareilComponent} from './configurationAppareil/configuration-appareil.component';
import {PredictHourFactureComponent} from './factures/predict-hour-facture/predict-hour-facture.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'info',
      component: InfoComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'historique',
      component: HistoriqueComponent,
    },
    {
      path: 'factures',
      component: FacturesComponent,
    },
    {
      path: 'alarm',
      component: AlarmComponent,
    },
    {
      path: 'ajout-appareil',
      component: AddDeviceComponent,
    },
    {
      path: 'configuartion',
      component: ConfigurationAppareilComponent,
    },
    {
      path: 'configuartion/:id',
      component: ConfigurationAppareilComponent,
    },
    {
      path: 'factures/prediction/:nbHeur',
      component: PredictHourFactureComponent,
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
