import { Component, OnInit, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
    title="Google Maps API";
    latitude: number = 0.6;
    longitude: number = 41.1;
    zoom: number = 4;
    mapTypeId: string = "hybrid";

    markers: marker[] = [];

    constructor() { }

    ngOnInit(
        
    ) { }

    mapClicked(event: MouseEvent){
        /* console.info(event);
        this.markers.push({
            latitude: event.coords.lat,
            longitude: event.coords.lng,
            draggable: true
        }); */
    }

    mapReady(event: any) {
        //console.log(event);
    }

    markerClick(marker: marker, event: MouseEvent) {
        //console.log(`clicked the marker: ${marker.label}`)
    }

    dragEnd(m: marker, event: MouseEvent) {
        //console.log('dragEnd' + m + event);
    }

    cleanMarkers(): void {
        this.markers.splice(0, this.markers.length);
    }

    addMarker(name: string, location: number[]): void {
        this.markers.push({
            latitude: location[0],
            longitude:location[1],
            label: name,
            draggable: false
        });
    }

    removeMarker(name: string, location: number[]): void {
        var index = this.markers.indexOf({
            latitude: location[0],
            longitude:location[1],
            label: name,
            draggable: false
        });
        this.markers.splice(index, 1);
    }
}

interface marker {
    latitude: number;
    longitude: number;
    label?: string;
    draggable: boolean;
}