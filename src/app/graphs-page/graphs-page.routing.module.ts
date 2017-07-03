import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphsPageComponent } from './graphs-page.component';

const routes: Routes = [
  { path: 'graphs', component: GraphsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphsPageRoutingModule { }

export const routedComponents = [GraphsPageComponent];