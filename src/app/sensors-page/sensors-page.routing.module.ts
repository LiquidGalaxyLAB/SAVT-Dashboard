import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorsPageComponent } from './sensors-page.component';

const routes: Routes = [
  { path: 'sensors', component: SensorsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorsPageRoutingModule { }

export const routedComponents = [SensorsPageComponent];