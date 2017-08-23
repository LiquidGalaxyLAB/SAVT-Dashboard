import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';

import { SensorsPageComponent } from './sensors-page.component';

import { SensorsPageRoutingModule } from './sensors-page.routing.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MdButtonModule,
        MdIconModule,
        SensorsPageRoutingModule,
    ],
    exports: [],
    declarations: [SensorsPageComponent],
    providers: [],
})
export class SensorsPageModule { }
