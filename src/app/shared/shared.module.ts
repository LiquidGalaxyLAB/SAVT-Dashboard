import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSidenavModule } from '@angular/material';
import { SidenavModule } from './layout/sidenav/sidenav.module';
import { ToolbarModule } from './layout/toolbar/toolbar.module';
import { MyFooterModule } from './layout/my-footer/my-footer.module';
import { BarChartModule } from './bar-chart/bar-chart.module';

import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MyFooterComponent } from './layout/my-footer/my-footer.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

import { SensorService } from './services/sensor.service';
import { SidenavService } from './services/sidenav.service';
import { ImageService } from './services/image.service';

@NgModule({
    imports: [
        CommonModule,
        SidenavModule,
        ToolbarModule,
        MyFooterModule,
        BarChartModule
    ],
    exports: [
        MdSidenavModule,
        ToolbarComponent,
        MyFooterComponent,
        SidenavComponent,
        BarChartComponent,
    ],
    declarations: [
    ],
    providers: [
        SensorService,
        SidenavService,
        ImageService,
    ],
})
export class SharedModule { }
