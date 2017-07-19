import { Injectable } from '@angular/core';

import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Image } from '../models/image';

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

    getImages(): Observable<Image[]> {
        return this.http.get(this.imagesUrl)
    .map(this.extractImagesData)
    .catch(this.handleError);
    }

    uploadImage(image: File): Promise<any> {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('upload', image, image.name);
            xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                }
            xhr.open("POST", this.imagesUrl, true);
            xhr.send(formData);
        });
            
    }

    private extractImagesData(res: Response) {
        let body = res.json();
        var imagesData = [{}];
        var filesUrl = 'http://localhost:3000/photos/';
        for (let element of body) {
            var jsonAux = {
            "_id": element._id,
            "name": element.originalName,
            "url": filesUrl + element.fileName,
            "latitude": element.gpsLatitude,
            "longitude": element.gpsLongitude,
            "altitude": element.gpsAltitude
            }; 
            imagesData.push(jsonAux);
        }
        // Had to slice imagesData array because it saves an empty slot
        // in its first position
        return imagesData.slice(1, imagesData.length) || { };
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