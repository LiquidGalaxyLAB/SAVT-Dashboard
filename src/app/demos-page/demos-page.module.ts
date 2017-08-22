import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';

import { BusyModule } from 'angular2-busy';

import { DemosPageComponent } from './demos-page.component';

import { DemosPageRoutingModule } from './demos-page.routing.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MdButtonModule,
        BusyModule,
        DemosPageRoutingModule
    ],
    exports: [],
    declarations: [DemosPageComponent],
    providers: [],
})
export class DemosPageModule { }
