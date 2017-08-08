import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';

import { SensorService } from '../shared/services/sensor.service';

@Component({
    selector: 'sensors-page',
    templateUrl: './sensors-page.component.html',
    styleUrls: ['./sensors-page.component.css']
})

export class SensorsPageComponent implements OnInit {

    magnitudes: any[] = ['valueAirTemperature'];

    constructor(
        private sensorService: SensorService
    ) {
        
     }

    ngOnInit() {
        //this.initializeMagnitudes();
     }

    /*private initializeMagnitudes(): void {
        this.sensorService.getAvailableAttributes()
    .subscribe(

        );
    }*/
}