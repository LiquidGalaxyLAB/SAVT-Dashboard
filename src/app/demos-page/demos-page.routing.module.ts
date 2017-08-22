import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemosPageComponent } from './demos-page.component';

const routes: Routes = [
  { path: 'demos', component: DemosPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemosPageRoutingModule { }

export const routedComponents = [DemosPageComponent];