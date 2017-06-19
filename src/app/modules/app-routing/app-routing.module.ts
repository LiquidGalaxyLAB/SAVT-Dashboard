import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SensorsComponent } from '../../components/sensors/sensors.component';
import { SensorDetailComponent } from '../../components/sensor-detail/sensor-detail.component';
import { GraphsPageComponent } from '../../components/graphs-page/graphs-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/sensors',
        pathMatch: 'full'
    },
    {
        path: 'sensors',
        component: SensorsComponent
    },
    {
        path: 'sensor/:name',
        component: SensorDetailComponent
    },
    {
        path: 'graphs',
        component: GraphsPageComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
