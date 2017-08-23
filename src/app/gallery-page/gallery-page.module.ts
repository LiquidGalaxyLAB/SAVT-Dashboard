import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';

import { GalleryPageComponent } from './gallery-page.component';
import { ModalViewerComponent } from './modal-viewer/modal-viewer.component';

import { GalleryPageRoutingModule } from './gallery-page.routing.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MdButtonModule,
        MdIconModule,
        GalleryPageRoutingModule
    ],
    exports: [],
    declarations: [
        GalleryPageComponent,
        ModalViewerComponent
    ],
    providers: [],
})
export class GalleryPageModule { }
