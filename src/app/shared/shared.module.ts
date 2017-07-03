import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSidenavModule } from '@angular/material';
import { SidenavModule } from './layout/sidenav/sidenav.module';
import { ToolbarModule } from './layout/toolbar/toolbar.module';
import { BarChartModule } from './bar-chart/bar-chart.module';

import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

import { SensorService } from './services/sensor.service';
import { SidenavService } from './services/sidenav.service';

@NgModule({
    imports: [
        CommonModule,
        SidenavModule,
        ToolbarModule,
        BarChartModule
    ],
    exports: [
        MdSidenavModule,
        ToolbarComponent,
        SidenavComponent,
        BarChartComponent,
    ],
    declarations: [
    ],
    providers: [
        SensorService,
        SidenavService,
    ],
})
export class SharedModule { }
