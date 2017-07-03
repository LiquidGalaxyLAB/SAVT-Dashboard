import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { BarChartComponent } from './bar-chart.component';

@NgModule({
    imports: [
        ChartsModule
    ],
    exports: [
        BarChartComponent
    ],
    declarations: [
        BarChartComponent
    ],
    providers: [],
})
export class BarChartModule { }
