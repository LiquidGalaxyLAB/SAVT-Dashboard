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

    markers: marker[] = [
        {
		  latitude: 51.673858,
		  longitude: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  latitude: 51.373858,
		  longitude: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  latitude: 51.723858,
		  longitude: 7.895982,
		  label: 'C',
		  draggable: true
	  }
    ];

    constructor() { }

    ngOnInit(
        
    ) { }

    map_mapClicked(event: MouseEvent){
        console.info(event);
        this.markers.push({
            latitude: event.coords.lat,
            longitude: event.coords.lng,
            draggable: false
        });
    }

    map_mapReady(event: any) {
        console.log(event);
    }

    marker_markerClick(marker: marker, event: MouseEvent) {
        console.log(`clicked the marker: ${marker.label}`)
    }

    markerDragEnd(m: marker, event: MouseEvent) {
        console.log('dragEnd' + m + event);
    }
}

interface marker {
    latitude: number;
    longitude: number;
    label?: string;
    draggable: boolean;
}