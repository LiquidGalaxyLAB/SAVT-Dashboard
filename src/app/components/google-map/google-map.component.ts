import { Component, OnInit, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
    title="Google Maps API";
    @Input() latitude: number;
    @Input() longitude: number;
    constructor() { }

    ngOnInit(
        
    ) { }

    mapClicked(event: MouseEvent){
        console.info(event);
    }
}