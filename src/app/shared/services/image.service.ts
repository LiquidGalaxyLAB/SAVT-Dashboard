import { Injectable } from '@angular/core';


import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Image } from '../models/image';
import { marker } from '../models/marker';
import { Author } from '../models/author';
import { Album } from '../models/album';
import { Overlay } from '../models/overlay';

import { appConfig } from '../environments/config';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
    private mapSubject = new Subject<Image>();
    observableSubject$ = this.mapSubject.asObservable();
    private image: Image;

    private imagesUrl = `${appConfig.publicApiEndpoint}/images`;
    private authorsUrl = `${appConfig.publicApiEndpoint}/authors`;
    private albumsUrl = `${appConfig.publicApiEndpoint}/albums`;
    private overlaysUrl = `${appConfig.publicApiEndpoint}/overlays`;
    private kmlsUrl = `${appConfig.localApiEndpoint}/kmls`;

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

    getOverlayByImage(imageId: string): Observable<Overlay> {
        const url = `${this.overlaysUrl}/image/${imageId}`;
        return this.http.get(url)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    uploadImage(image: File): Promise<any> {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('upload', image, image.name);
            xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            this.imageId = xhr.response;
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

    uploadOverlay(image: Image) {
        const url = `${this.overlaysUrl}/uploadImage/image/${image._id}`;
        const jsonBody = {
            "latitude": image.latitude,
            "longitude": image.longitude
        };
        return this.http.post(url, JSON.stringify(jsonBody), this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
        
    }

    generateKmlOverlay(overlay: Overlay): Observable<Response> {
        const url = `${this.kmlsUrl}/overlays`;
        const jsonBody = this.createBodyKml(overlay);
        return this.http.post(url, jsonBody, this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
    }

    saveMarkers(image: Image, markers: marker[]) {
        const url = `${this.overlaysUrl}/saveMarkers/image/${image._id}`;
        const jsonBody = {
            "markerDL": [markers[0].longitude, markers[0].latitude,],
            "markerDR": [markers[1].longitude, markers[1].latitude,],
            "markerUR": [markers[2].longitude, markers[2].latitude,],
            "markerUL": [markers[3].longitude, markers[3].latitude,],
        };
        return this.http.post(url, JSON.stringify(jsonBody), this.options)
    .map(this.extractJsonData)
    .catch(this.handleError);
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

    private createBodyKml(overlay: Overlay): string {
        var jsonAux = {
            "name": "ImagesOverlayKml",
            "corners": {
                "down-left": overlay.markerDL,
                "down-right": overlay.markerDR,
                "up-right": overlay.markerUR,
                "up-left": overlay.markerUL
            },
            "coordinates": {
                "latitude": overlay.latitude,
                "longitude": overlay.longitude
            },
            "images": <any>[]
        };
        overlay.images.forEach(image => {
            var imageJson = {
                "name": image.name,
                "url": image.url,
            };
            jsonAux.images.push(imageJson)
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