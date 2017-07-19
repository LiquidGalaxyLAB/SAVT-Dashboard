import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Image } from '../../shared/models/image';

@Injectable()
export class MapService {
    private mapSubject = new Subject<Image>();

    observableSubject$ = this.mapSubject.asObservable();

    private image: Image;

    constructor() { }

    addImageOverlay(image: Image) {
        this.image = image;
        this.getImageOverlay();
    }

    getImageOverlay() {
        this.mapSubject.next(this.image);
    }
}