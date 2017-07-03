import { Injectable } from '@angular/core';

import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Sensor } from '../models/sensor';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorService {
    private sensorsUrl = 'http://localhost:3000/sensors';
    private headers = new Headers({'Content-Type':
'application/json'});
    private options = new RequestOptions({ headers: this.headers });

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

/*    getSensorsChart(): Observable<string[]> {
        return this.http.get(this.sensorsUrl)
    .map(this.extractSensorsDataName)
    .catch(this.handleError);
    }
*/
    generateKmlSensors(sensors: Sensor[]): Observable<Response> {
        const url = `${this.sensorsUrl}/kml/generateKml`;
        const jsonBody = this.createBodyKml(sensors);
        console.log(jsonBody);
        return this.http.post(url, jsonBody, this.options)
    .map(this.extractSensorsData)
    .catch(this.handleError);
    }
    
    private extractSensorsData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private extractSensorData(res: Response) {
        let body = res.json();
        return body[0] || { };
    }

    private extractSensorDataName(res: Response) {
        let body = res.json();
        return body || { };
    }

    private createBodyKml(sensors: Sensor[]): string {
        var jsonAux = {
            "name": "SensorsListKml",
            "sensors": <any>[]
        };
        sensors.forEach(sensor => {
            var sensorJson = {
                "name": sensor.name,
                "data": {
                    "temperature": sensor.temperatureValue
                },
                "coords": {
                    "lat": sensor.location[0],
                    "lng": sensor.location[1]
                }
            };
            jsonAux.sensors.push(sensorJson)
        });
        return JSON.stringify(jsonAux);
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