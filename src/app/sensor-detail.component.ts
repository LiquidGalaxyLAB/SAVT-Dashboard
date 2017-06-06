import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';

import { Sensor } from './sensor';
import { SensorService } from './sensor.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'sensor-detail',
    templateUrl: './sensor-detail.component.html'
})

export class SensorDetailComponent implements OnInit {
    @Input() sensor: Sensor;

    constructor(
        private sensorService: SensorService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getSensor();
     }

     getSensor(): void {
        this.route.params
    .switchMap((params: Params) =>
            this.sensorService.getSensor(params['name']))
    .subscribe(
            sensor => this.sensor = sensor
            error => this.errorMessage = <any>error
            );
     }
}