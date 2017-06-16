import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import { DialogComponent } from '../../components/dialog/dialog.component';

import { Sensor } from '../../models/sensor/sensor';
import { SensorService } from '../../services/sensor/sensor.service';

import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

@Component({
    selector: 'sensors',
    templateUrl: './sensors.component.html'
})

export class SensorsComponent implements OnInit {
    @ViewChild('googleMap') googleMap: any;
    sensors: Sensor[];
    selectedSensor: Sensor;
    errorMessage: string;
    kmlMessage: string;
    checkedSensorsList: Sensor[] = [];
    
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;

    constructor(private sensorService: SensorService,
        private router: Router,
        public dialog: MdDialog,
        public snackbar: MdSnackBar) { }

    ngOnInit() {
        this.refreshData();
     }

    public ngOnDestroy(): void {ElementRef
        if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    private subscribeToData(): void {
        this.timerSubscription=Observable.timer(600000)  
    .subscribe(()=>this.refreshData()); 
    }

    private refreshData(): void {
        this.postsSubscription = this.sensorService.getSensors()
    .subscribe(
        sensors => {
            this.sensors = sensors;
            this.subscribeToData();
            this.snackbar.open('Sensors list UPDATED', 'OK', {
                duration: 500
            });
        },
        error => this.errorMessage = <any>error
        );
    }

    getSensors(): void {
        this.sensorService.getSensors()
    .subscribe(
        sensors => this.sensors = sensors,
        error => this.errorMessage = <any>error
        );
    }

    generateKml(): void {
        if (this.checkedSensorsList.length === 0){
            this.snackbar.open('Hey ! You must select some sensor to generate a KML.', 'OK', {
                duration: 3000
            });
        }
        else {
            let dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(response => {
            if (response === 'yes') {
                // Generate KML
                this.sensorService.generateKmlSensors(this.checkedSensorsList)
            .subscribe(
                response => {
                    if (response.toString() === 'OK'){
                        this.snackbar.open('KML Generated !', 'OK', {
                            duration: 2000
                        });
                    }
                    else if (response.toString() === 'ERROR'){
                        this.snackbar.open('There was an error generating the KML file :(', 'OK', {
                            duration: 2000
                        });
                    }
                },
                error => this.errorMessage = <any>error
                );
            }
        });
        }
    }

    checkboxChange(event: Event, sensor:Sensor): void {
        //'event' parameter has to determinate a type. Look in material.io library
        const isChecked = event['checked'];
        if (isChecked) {
            this.googleMap.addMarker(sensor.name, sensor.location);
            this.checkedSensorsList.push(sensor);
        }
        else {
            this.googleMap.removeMarker(sensor.name, sensor.location);
            var index = this.checkedSensorsList.indexOf(sensor);
            this.checkedSensorsList.splice(index, 1);
        }
    }

    onSelect(sensor: Sensor): void {
        this.selectedSensor = sensor;
    }

}