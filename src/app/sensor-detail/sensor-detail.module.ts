import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MdToolbarModule } from '@angular/material';
import { MdGridListModule} from '@angular/material';

import { SensorDetailComponent } from './sensor-detail.component';

import { SensorDetailRoutingModule } from './sensor-detail.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MdToolbarModule,
        MdGridListModule,
        SharedModule,
        SensorDetailRoutingModule
    ],
    exports: [],
    declarations: [SensorDetailComponent],
    providers: [],
})
export class SensorDetailModule { }
