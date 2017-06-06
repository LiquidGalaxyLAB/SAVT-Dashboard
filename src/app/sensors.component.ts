import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Sensor } from './sensor';
import { SensorService } from './sensor.service';


@Component({
    selector: 'sensors',
    templateUrl: './sensors.component.html'
})

export class SensorsComponent implements OnInit {
    sensors: Sensor[];
    errorMessage: string;

    constructor(private sensorService: SensorService,
        private router: Router) { }

    ngOnInit() {
        this.getSensors();
     }

    getSensors(): void {
        this.sensorService.getSensors()
    .subscribe(
        sensors => this.sensors = sensors,
        error => this.errorMessage = <any>error
        );
    }

    goToDetail(sensor: Sensor): void {
        this.router.navigate(['/sensor', sensor.name]);
    }

}