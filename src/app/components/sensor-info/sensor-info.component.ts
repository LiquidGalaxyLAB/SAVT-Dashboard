import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Sensor } from '../../models/sensor/sensor';

@Component({
  selector: 'sensor-info',
  templateUrl: './sensor-info.component.html' 
})
export class SensorInfoComponent {
    @Input() sensor: Sensor;
    
    constructor(private router: Router) { }

    goToDetail(sensor: Sensor): void {
        this.router.navigate(['/sensor', sensor.name]);
    }

}