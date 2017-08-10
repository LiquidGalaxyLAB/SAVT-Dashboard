import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';

import { Sensor } from '../shared/models/sensor';
import { Field } from '../shared/models/field';
import { SensorService } from '../shared/services/sensor.service';

import { ImageService } from '../shared/services/image.service';

import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'sensors',
    templateUrl: './kml-generator.component.html',
    styleUrls: ['./kml-generator.component.css']
})

export class KmlGeneratorComponent implements OnInit {
    @ViewChild('googleMap') googleMap: any;
    // googleMap has to be defined by a eventEmitter / SOMETHING (not any)
    @ViewChild('imageImporter') imageImporter: any;
    sensors: Sensor[] = [];
    fields: Field[];
    fieldSensors: String[];
    fieldSelected: Field;
    errorMessage: string;
    kmlMessage: string;
    checkedSensorsList: Sensor[] = [];

    busy: Subscription;
    
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;

    constructor(private sensorService: SensorService,
        private imageService: ImageService,
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
        this.postsSubscription = this.sensorService.getFields()
    .subscribe(
        fields => {
            this.fields = fields;
            this.subscribeToData();
            this.snackbar.open('Fields list UPDATED', 'OK', {
                duration: 1000
            });
        },
        error => this.errorMessage = <any>error
        );
    }

    getFields(): void {
        this.sensorService.getFields()
    .subscribe(
        fields => this.fields = fields,
        error => this.errorMessage = <any>error
        );
    }

    goToDetail(sensor: Sensor): void {
        this.router.navigate(['/sensor', sensor.name]);
    }

    generateKml(): void {
        if (this.sensors.length === 0){
            if (this.imageImporter.selectedImage === undefined){
                this.snackbar.open('Hey ! You must select some data to generate a KML.', 'OK', {
                duration: 4000
                });
            }
            else if (this.googleMap.imageMarkers.length != 4){
                this.snackbar.open('Hey ! You must calibrate the image by placing 4 markerts on its corners', 'OK', {
                duration: 4000
                });
            }
            else {
                let dialogRef = this.dialog.open(DialogComponent);
                dialogRef.afterClosed().subscribe(response => {
                    if (response === 'yes') {
                        // Generate KML
                        this.busy = this.imageService.generateKmlImage(this.imageImporter.selectedImage)
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
        else {
            let dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(response => {
            if (response === 'yes') {
                // Generate KML
                this.busy = this.sensorService.generateKmlSensors(this.sensors)
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

    selectField(field: Field): void {
        this.cleanField();
        this.fieldSelected = field;
        this.fieldSensors = field.sensors;
        this.fieldSensors.forEach(fieldSensor => {
            this.sensorService.getSensorById(fieldSensor)
        .subscribe(
            sensor => this.placeSensor(sensor),
            error => this.errorMessage = <any>error
            );
        });
    }

    private placeSensor(sensor: Sensor) {
        this.sensors.push(sensor);
        this.googleMap.addMarker(sensor.name, sensor.locationLatitude, sensor.locationLongitude);
    }

    private cleanField(): void {
        this.sensors.splice(0, this.sensors.length);
        this.googleMap.cleanMarkers();
        this.googleMap.cleanSensorMarkers();
    }

}