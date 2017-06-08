import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs/Rx';

import { Sensor } from '../../models/sensor/sensor';
import { SensorService } from '../../services/sensor/sensor.service';

import 'rxjs/add/operator/switchMap';

import * as io from 'socket.io-client';

@Component({
    selector: 'sensor-detail',
    templateUrl: './sensor-detail.component.html'
})

export class SensorDetailComponent implements OnInit {
    @Input() sensor: Sensor;
    errorMessage: string;
    socket: any = null;
    x = new BehaviorSubject(null);

    constructor(
        private sensorService: SensorService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getSensor();
        this.socket = io('http://localhost:4000');
        this.socket.on('updated', function(sensorName: string) {
            console.log(sensorName);
            // x.next(sensorName)
        });
        /* x.subscribe((value) => {
            // VALUE ES LO QUE EM RETORNARA NEX. FER SOCKETS A UN SERVEI A PART I SUBSCRIUREM A AQUELL SERVEI A CADA COMPONENT QUE EL NECESSITI
        })*/
        
     }

     getSensor(): void {
        this.route.params
    .switchMap((params: Params) =>
            this.sensorService.getSensor(params['name']))
    .subscribe(
            sensor => this.sensor = sensor,
            error => this.errorMessage = <any>error
            );
     }
}