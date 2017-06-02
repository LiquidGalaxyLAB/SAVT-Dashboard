import { Component, OnInit } from '@angular/core';

import { Sensor } from './sensor';
import { SensorService } from './sensor.service';


@Component({
    selector: 'sensors',
    templateUrl: './sensors.component.html'
})

export class SensorsComponent implements OnInit {
    sensors: Sensor[];

    constructor(private sensorService: SensorService) { }

    ngOnInit() {
        this.getSensors();
     }

    getSensors(): void {
        this.sensorService.getSensors()
    .then(sensors => this.sensors = sensors);
    }
}