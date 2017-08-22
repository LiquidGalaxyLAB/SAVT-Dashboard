import { Component, OnInit } from '@angular/core';

import { DemoService } from '../shared/services/demo.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'demos-page',
    templateUrl: './demos-page.component.html',
    styleUrls: ['./demos-page.component.css']
})

export class DemosPageComponent implements OnInit {

    private errorMessage: string;
    busy: Subscription;

    constructor(private demoService: DemoService) { }

    ngOnInit() { }

    demoSensors() {
        console.log('Demo Sensors');
        this.busy = this.demoService.playDemoSensors().subscribe(
            response => console.log('OK'),
            error => this.errorMessage = <any>error
        );
    }

    demoOverlays() {
        console.log('Demo Overlays');
        this.busy = this.demoService.playDemoOverlays().subscribe(
            response => console.log('OK'),
            error => this.errorMessage = <any>error
        );
    }

    stopDemo() {
        console.log('Stop Demo');
        this.busy = this.demoService.stopDemo().subscribe(
            response => console.log('OK'),
            error => this.errorMessage = <any>error
        );
    }
}