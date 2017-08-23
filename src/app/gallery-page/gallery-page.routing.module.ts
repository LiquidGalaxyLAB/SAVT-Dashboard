import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from './gallery-page.component';

const routes: Routes = [
  { path: 'gallery', component: GalleryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryPageRoutingModule { }

export const routedComponents = [GalleryPageComponent];