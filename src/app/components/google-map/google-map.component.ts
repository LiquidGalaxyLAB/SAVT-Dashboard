import { Component, OnInit, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
    title="Google Maps API";
    map_latitude: number = 41.1;
    map_longitude: number = 0.6;
    map_zoom: number = 2;
    map_mapTypeId: string = "hybrid";
    constructor() { }

    ngOnInit(
        
    ) { }

    mapClicked(event: MouseEvent){
        console.info(event);
    }
}