import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';

import { Sensor } from './sensor';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorService {
    private sensorsUrl = 'http://localhost:3000/sensors';
    private headers = new Headers({'Content-Type':
'application/json'});

    constructor(private http: Http) { }

    getSensors(): Observable<Sensor[]> {
        return this.http.get(this.sensorsUrl)
    .map(this.extractSensorsData)
    .catch(this.handleError);
    }

    getSensor(name: string): Observable<Sensor> {
        const url = `${this.sensorsUrl}/${name}`;
        return this.http.get(url)
    .map(this.extractSensorData)
    .catch(this.handleError);
    } 

    private extractSensorsData(res: Response) {
        let body = res.json();
        console.log(body);
        return body || { };
    }

    private extractSensorData(res: Response) {
        let body = res.json();
        console.log(body[0]);
        return body[0] || { };
    }

      private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
}