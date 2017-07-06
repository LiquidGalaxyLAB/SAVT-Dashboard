import { Injectable } from '@angular/core';

import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
    private imagesUrl = 'http://localhost:3000/images';
    private headers = new Headers({'Content-Type':
    'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

/*
    uploadImage(): Observable {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    }

    */

    uploadImage(image: File): Observable<any> {
        return this.http.post(this.imagesUrl, image)
    .map(this.extractImagesData)
    .catch(this.handleError);
    }

    private extractImagesData(res: Response) {
        let body = res.json();
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