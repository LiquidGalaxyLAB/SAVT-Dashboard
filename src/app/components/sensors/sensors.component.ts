import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

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
    sensors: Sensor[];
    errorMessage: string;
    kmlMessage: string;
    checkedSensorsList: Sensor[] = [];
    
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;

    constructor(private sensorService: SensorService,
        private router: Router,
        public dialog: MdDialog) { }

    ngOnInit() {
        this.refreshData();
     }

    public ngOnDestroy(): void {
        if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    private subscribeToData(): void {
        this.timerSubscription=Observable.timer(60000)  
    .subscribe(()=>this.refreshData()); 
    }

    private refreshData(): void {
        this.postsSubscription = this.sensorService.getSensors()
    .subscribe(
        sensors => {
            this.sensors = sensors;
            this.subscribeToData();
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

    goToDetail(sensor: Sensor): void {
        this.router.navigate(['/sensor', sensor.name]);
    }

    generateKml(): void {
        let dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(response => {
            if (response === 'yes') {
                // Generate KML
                console.info(response + this.checkedSensorsList);
            }
        });
    }

    checkboxChange(event: Event, sensor:Sensor): void {
        //'event' parameter has to determinate a type. Look in material.io library
        const isChecked = event['checked'];
        if (isChecked) {
            this.checkedSensorsList.push(sensor);
        }
        else {
            var index = this.checkedSensorsList.indexOf(sensor);
            this.checkedSensorsList.splice(index, 1);
        }
        console.info(this.checkedSensorsList);
    }

    /*
    generateKml(sensorsSelected: [Sensor]): void {
        this.sensorService.generateKml()
    .subscribe(
        message => this.kmlMessage = message,
        error => this.errorMessage = <any>error
        );
    }
    */

}