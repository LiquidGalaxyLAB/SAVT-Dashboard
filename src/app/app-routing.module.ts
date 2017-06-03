import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SensorsComponent } from './sensors.component';
import { SensorDetailComponent } from './sensor-detail.component';

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
        path: 'sensor/:id',
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
