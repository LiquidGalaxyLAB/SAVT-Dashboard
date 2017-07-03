import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KmlGeneratorComponent } from './kml-generator.component';

const routes: Routes = [
  { path: 'kml', component: KmlGeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KmlGeneratorRoutingModule { }

export const routedComponents = [KmlGeneratorComponent];