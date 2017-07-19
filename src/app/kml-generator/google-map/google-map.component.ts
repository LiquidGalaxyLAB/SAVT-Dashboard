import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { KmlLayerOptions } from '@agm/core/services/google-maps-types';
import { Polyline } from "@agm/core/services/google-maps-types";

import { MapService } from '../../shared/services/map.service';

declare var google: any;

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
    title="Google Maps API";
    latitude: number = 42.50793490998189;
    longitude: number = -2.6150627450980393;
    zoom: number = 16;
    mapTypeId: string = "hybrid";
    markers: marker[] = [];

    url: string;

    private _map: any;

    private activeGeofence?: Polyline;
    private imageOverlay: any;
    private _onMapClickListener: any;
    private elem: HTMLElement;
    private orientationValue: number = 0;

    @Output() onClean = new EventEmitter<boolean>();

    constructor(
        private mapApi: GoogleMapsAPIWrapper,
        private mapService: MapService
    ) { }

    ngOnInit( ) {
        this.subscribeToMap();
     }


    rotateLeft() {
        this.getHtmlElement();
        this.elem.style.webkitTransform = 'rotate('+(this.orientationValue-15)+'deg)';
        this.elem.style.transform = 'rotate('+(this.orientationValue-15)+'deg)';
        this.orientationValue -= 15;
    }

    rotateRight() {
        this.getHtmlElement();
        this.elem.style.webkitTransform = 'rotate('+(this.orientationValue+15)+'deg)';
        this.elem.style.transform = 'rotate('+(this.orientationValue+15)+'deg)';
        this.orientationValue += 15;
    }

    increaseSize() {
        this.getHtmlElement();
        let width = parseInt(this.elem.style.width, 10);
        let height = parseInt(this.elem.style.height, 10);
        this.elem.style.width = `${width + 20}px`;
        this.elem.style.height = `${height + 20}px`;
    }

    decreaseSize() {
        this.getHtmlElement();
        let width = parseInt(this.elem.style.width, 10);
        let height = parseInt(this.elem.style.height, 10);
        this.elem.style.width = `${width - 20}px`;
        this.elem.style.height = `${height - 20}px`;
    }

    private getHtmlElement(): void {
        /*
        document.querySelector('google-map img[src^="http://localhost:3000"]')
        document.querySelectorAll('google-map img[src^="http://localhost:3000"]')
        */
        this.elem = <HTMLElement>document.querySelector('google-map img[src^="http://localhost:3000"]');
        let parent = this.elem.parentElement;
        parent.style.overflow = 'initial';
    }

    private subscribeToMap(): void {
        this.mapService.observableSubject$.subscribe( image => {
            if (this.imageOverlay != null){
                this.imageOverlay.setMap(null);
                this.orientationValue = 0;
            }
            this.imageOverlay = new google.maps.GroundOverlay(
            image.url, this.calculateBounds(image.latitude, image.longitude, image.altitude));
            this.imageOverlay.setMap(this._map);
            console.log(image.name);
        });
    }

    private calculateBounds(latitude: number, longitude: number, altitude: number): any {
        var bounds = {
            north: latitude + 0.0005,
            south: latitude - 0.0005,
            east: longitude + 0.0008,
            west: longitude - 0.0008
        };
        console.log(bounds);
        return bounds;
    }

    mapClicked(event: MouseEvent){
        /* console.info(event);
        this.markers.push({
            latitude: event.coords.lat,
            longitude: event.coords.lng,
            draggable: true
        }); */
    }

    mapReady(map: any) {
        this._map = map;
    }

    markerClick(marker: marker, event: MouseEvent) {
        //console.log(`clicked the marker: ${marker.label}`)
    }

    dragEnd(m: marker, event: MouseEvent) {
        //console.log('dragEnd' + m + event);
    }

    cleanMarkers(): void {
        const clean = true;
        this.onClean.emit(clean);
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