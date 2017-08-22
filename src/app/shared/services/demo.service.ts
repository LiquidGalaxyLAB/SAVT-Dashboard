import { Injectable } from '@angular/core';

import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { appConfig } from '../environments/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DemoService {

    private kmlsUrl = `${appConfig.localApiEndpoint}/kmls`;

    private headers = new Headers({'Content-Type':'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    playDemoSensors(): Observable<Response> {
        const url = `${this.kmlsUrl}/demos/sensors`;
        return this.http.post(url, {}, this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    playDemoOverlays(): Observable<Response> {
        const url = `${this.kmlsUrl}/demos/overlays`;
        return this.http.post(url, {}, this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    stopDemo(): Observable<Response> {
        const url = `${this.kmlsUrl}/demos/stop`;
        return this.http.post(url, {}, this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    private extractJsonData(res: Response) {
         let body = res.json();
         return body || { };
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