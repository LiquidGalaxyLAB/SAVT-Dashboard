import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SensorsComponent } from '../../components/sensors/sensors.component';
import { SensorDetailComponent } from '../../components/sensor-detail/sensor-detail.component';

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
