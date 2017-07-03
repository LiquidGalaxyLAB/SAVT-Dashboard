import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorDetailComponent } from './sensor-detail.component';

const routes: Routes = [
  { path: 'sensor/:name', component: SensorDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorDetailRoutingModule { }

export const routedComponents = [SensorDetailComponent];