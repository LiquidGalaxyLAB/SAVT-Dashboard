import { Injectable } from '@angular/core';


import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Image } from '../models/image';
import { marker } from '../models/marker';
import { Author } from '../models/author';
import { Album } from '../models/album';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
    private mapSubject = new Subject<Image>();
    observableSubject$ = this.mapSubject.asObservable();
    private image: Image;

    private imagesUrl = 'http://localhost:3000/images';
    private authorsUrl = 'http://localhost:3000/authors';
    private albumsUrl = 'http://localhost:3000/albums';

    private headers = new Headers({'Content-Type':
'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    private imageMarkers: marker[];
    private imageId: string;

    constructor(private http: Http) { }

    addImageOverlay(image: Image) {
        this.image = image;
        this.getImageOverlay();
    }

    getImageOverlay() {
        this.mapSubject.next(this.image);
    }

    getAuthors(): Observable<Author[]> {
        return this.http.get(this.authorsUrl)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    getAuthorByName(name: String): Observable<Author> {
        const url = `${this.authorsUrl}/name/${name}`;
        return this.http.get(url)
    .map(this.extractAuthorData)
    .catch(this.handleError);
    }

    getAlbumById(id: String): Observable<Album> {
        const url = `${this.albumsUrl}/${id}`;
        return this.http.get(url)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    getImageById(id: String): Observable<Image> {
        const url = `${this.imagesUrl}/${id}`;
        return this.http.get(url)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    getImages(): Observable<Image[]> {
        return this.http.get(this.imagesUrl)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    uploadImage(image: File): Promise<any> {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('upload', image, image.name);
            var self = this;
            xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            self.imageId = xhr.response;
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

    generateKmlImage(image: Image): Observable<Response> {
        const url = `${this.imagesUrl}/generateKml`;
        const jsonBody = this.createBodyKml(image);
        return this.http.post(url, jsonBody, this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    saveMarkers(markers: marker[]): void {
        this.imageMarkers = markers;
        console.log(this.imageMarkers);
    }

    uploadAlbum(albumName: string) {
        const url = `${this.albumsUrl}/upload/${albumName}`;
        const imageAux = this.imageId.substring(1, this.imageId.length - 1);
        const jsonAux = {
            "imageId": imageAux
        };
        return this.http.post(url, JSON.stringify(jsonAux), this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    private extractJsonData(res: Response) {
         let body = res.json();
         return body || { };
    }
     
    private extractAuthorData(res: Response) {
        let body = res.json();
        return body[0] || { };
    }

    private createBodyKml(image: Image): string {
        var jsonAux = {
            "name": "ImagesOverlayKml",
            "images": <any>[]
        };
        var imageJson = {
            "name": image.name,
            "url": image.url,
            "coords": {
                "lower-left": [this.imageMarkers[0].longitude, this.imageMarkers[0].latitude],
                "lower-right": [this.imageMarkers[1].longitude, this.imageMarkers[1].latitude],
                "upper-right": [this.imageMarkers[2].longitude, this.imageMarkers[2].latitude],
                "upper-left": [this.imageMarkers[3].longitude, this.imageMarkers[3].latitude]
            }
        };
        jsonAux.images.push(imageJson)
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