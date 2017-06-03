import { Injectable } from '@angular/core';

import { Sensor } from './sensor';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SensorService {
    private sensorsUrl = 'api/sensors';
    private headers = new Headers({'Content-Type':
'application/json'});

    constructor(private http: Http) { }

    getSensors(): Promise<Sensor[]> {
        return this.http.get(this.sensorsUrl)
    .toPromise()
    .then(response => response.json().data as Sensor[])
    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('ERROR', error);
        return Promise.reject(error.message || error);
    }

    getSensor(name: string): Promise<Sensor> {
        const url = `${this.sensorsUrl}/${name}`;
        return this.http.get(url)
    .toPromise()
    .then(response => response.json().data as Sensor)
    .catch(this.handleError);
    } 
}