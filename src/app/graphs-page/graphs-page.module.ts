import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdSlideToggleModule } from '@angular/material';

import { GraphsPageComponent } from './graphs-page.component';

import { GraphsPageRoutingModule } from './graphs-page.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        GraphsPageRoutingModule,
        MdSlideToggleModule,
        SharedModule
    ],
    exports: [],
    declarations: [GraphsPageComponent],
    providers: [],
})
export class GraphsPageModule { }
