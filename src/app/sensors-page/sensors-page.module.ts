import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SensorsPageComponent } from './sensors-page.component';

import { SensorsPageRoutingModule } from './sensors-page.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SensorsPageRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [SensorsPageComponent],
    providers: [],
})
export class SensorsPageModule { }
