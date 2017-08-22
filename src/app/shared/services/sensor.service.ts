import { Injectable } from '@angular/core';

import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Sensor } from '../models/sensor';
import { Field } from '../models/field';

import { appConfig } from '../environments/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorService {

    private sensorsUrl = `${appConfig.publicApiEndpoint}/sensors`;
    private fieldsUrl = `${appConfig.publicApiEndpoint}/fields`;
    private kmlsUrl = `${appConfig.localApiEndpoint}/kmls`;

    private headers = new Headers({'Content-Type':
'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getSensors(): Observable<Sensor[]> {
        return this.http.get(this.sensorsUrl)
    .map(this.extractSensorsData)
    .catch(this.handleError);
    }

    getSensorById(id: String): Observable<Sensor> {
        const url = `${this.sensorsUrl}/${id}`;
        return this.http.get(url)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    getSensorByName(name: String): Observable<Sensor> {
        const url = `${this.sensorsUrl}/name/${name}`;
        return this.http.get(url)
    .map(this.extractSensorData)
    .catch(this.handleError);
    }

    getFields(): Observable<Field[]> {
        return this.http.get(this.fieldsUrl)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

/*    getSensorsChart(): Observable<string[]> {
        return this.http.get(this.sensorsUrl)
    .map(this.extractSensorsDataName)
    .catch(this.handleError);
    }
*/
    generateKmlSensors(sensors: Sensor[]): Observable<Response> {
        const url = `${this.kmlsUrl}/sensors`;
        const jsonBody = this.createBodyKml(sensors);
        return this.http.post(url, jsonBody, this.options)
    .map(this.extractSensorsData)
    .catch(this.handleError);
    }
    
    private extractSensorsData(res: Response) {
        let body = res.json();
        console.log(body);
        return body.sensors || { };
    }

    private extractSensorData(res: Response) {
        let body = res.json();
        return body[0] || { };
    }

    private extractJsonData(res: Response) {
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
                "date": sensor.updated_at,
                "data": {
                    "AirTemperature": sensor.valueAirTemperature,
                    "AirHumidity": sensor.valueAirHumidity,
                    "AirPressure": sensor.valueAirPressure,
                    "SoilTemperature": sensor.valueSoilTemperature,
                    "LeafWetness": sensor.valueLeafWetness,
                    "AtmosphericPressure": sensor.valueAtmosphericPressure,
                    "SolarRadiation": sensor.valueSolarRadiation,
                    "UltravioletRadiation": sensor.valueUltravioletRadiation,
                    "TrunkDiameter": sensor.valueTrunkDiameter,
                    "StemDiameter": sensor.valueStemDiameter,
                    "FruitDiameter": sensor.valueFruitDiameter,
                    "Anemometer": sensor.valueAnemometer,
                    "WindVane": sensor.valueWindVane,
                    "Pluviometer": sensor.valuePluviometer,
                    "Luminosity": sensor.valueLuminosity,
                    "Ultrasound": sensor.valueUltrasound
                },
                "coords": {
                    "lat": sensor.locationLatitude,
                    "lng": sensor.locationLongitude
                }
            };
            jsonAux.sensors.push(sensorJson)
        });
        return JSON.stringify(jsonAux);
    }

    /*
    getAvailableAttributes(): Observable<{}> {
        return this.http.get(url)
    .map(this.extractAvailableAttributesData)
    .catch(this.handleError);
    }

    private extractAvailableAttributesData(res: Response) {
        let body = res.json();
        return body.summary.attributes.available || { };
    }

    */

    getAttributeValues(name: string): Observable<{sensorName: string, sensorValue: number}[]> {
        const url = `${this.sensorsUrl}/attribute/${name}`;
        return this.http.get(url)
    .map(this.extractAttributeData)
    .catch(this.handleError);
    }

    private extractAttributeData(res: Response) {
        let body = res.json();
        return body.values || { };
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