import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdToolbarModule, MdListModule, MdCheckboxModule, MdButtonModule, MdMenuModule } from '@angular/material';

import { KmlGeneratorComponent } from './kml-generator.component';

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
        MdMenuModule,
        KmlGeneratorRoutingModule,
        DialogModule,
        GoogleMapModule,
        SharedModule,
    ],
    exports: [],
    declarations: [KmlGeneratorComponent],
    providers: [],
})
export class KmlGeneratorModule { }
