import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Sensor } from './sensor';
import { SensorService } from './sensor.service';

import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

@Component({
    selector: 'sensors',
    templateUrl: './sensors.component.html'
})

export class SensorsComponent implements OnInit {
    sensors: Sensor[];
    errorMessage: string;
    
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;

    constructor(private sensorService: SensorService,
        private router: Router) { }

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
        this.timerSubscription=Observable.timer(5000)  
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

}