import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdToolbarModule, MdListModule, MdCheckboxModule, MdButtonModule } from '@angular/material';

import { BusyModule } from 'angular2-busy';

import { KmlGeneratorComponent } from './kml-generator.component';
import { ImageImporterComponent } from './image-importer/image-importer.component';

import { KmlGeneratorRoutingModule } from './kml-generator.routing.module';
import { DialogModule } from './dialog/dialog.module';
import { GoogleMapModule } from './google-map/google-map.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MdToolbarModule,
        MdListModule,
        MdCheckboxModule,
        MdButtonModule,
        BusyModule,
        KmlGeneratorRoutingModule,
        DialogModule,
        GoogleMapModule,
        SharedModule,
    ],
    exports: [],
    declarations: [KmlGeneratorComponent, ImageImporterComponent],
    providers: [],
})
export class KmlGeneratorModule { }
