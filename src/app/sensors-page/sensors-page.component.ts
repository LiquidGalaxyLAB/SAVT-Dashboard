import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';

import { SensorService } from '../shared/services/sensor.service';

import { Sensor } from '../shared/models/sensor';
import { Field } from '../shared/models/field';

@Component({
    selector: 'sensors-page',
    templateUrl: './sensors-page.component.html',
    styleUrls: ['./sensors-page.component.css']
})

export class SensorsPageComponent implements OnInit {

    fields: Field[];
    sensors: Sensor[] = [];
    availableSensors: String[] = ['Sensor 1', 'Sensor 2'];
    unavailableSensors: String[] = ['Sensor 1', 'Sensor 2'];
    availableMagnitudes: String[] = ['Magnitude 1', 'Magnitude 2'];
    unavailableMagnitudes: String[] = ['Magnitude 1', 'Magnitude 2'];
    fieldSelected: Field;
    sensorSelected: Sensor;

    errorMessage: string;

    viewFlags = {
        "fieldsView": false,
        "sensorsView": false
    };

    constructor(
        private sensorService: SensorService
    ) {
        
     }

    ngOnInit() {
        this.viewFields();
        this.sensorSelected = undefined;
    }

    viewFields(): void {
        this.viewFlags.fieldsView = true;
        this.viewFlags.sensorsView = false;
        this.getFields();
    }

    viewSensors(field: Field) {
        this.fieldSelected = field;
        this.viewFlags.fieldsView = false;
        this.viewFlags.sensorsView = true;
        this.getSensors(field);
    }

    selectView(view: string) {
        this.allFlagsFalse();
        this.viewFlags[view] = true;
    }

    goToDetail(sensor: Sensor): void {
        this.sensorSelected = sensor;
    }

    private getFields(): void {
        this.sensorService.getFields()
    .subscribe(
        fields => this.fields = fields,
        error => this.errorMessage = <any>error
        );
    }

    private getSensors(field: Field) {
        this.sensors.splice(0, this.sensors.length);
        field.sensors.forEach(sensor => {
            this.sensorService.getSensorById(sensor)
        .subscribe(
            sensor => this.sensors.push(sensor),
            error => this.errorMessage = <any>error
            );
        });
    }

    private allFlagsFalse(): void {
        this.viewFlags.fieldsView = false;
        this.viewFlags.sensorsView = false;
    }
}