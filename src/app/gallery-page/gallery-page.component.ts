import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalViewerComponent } from './modal-viewer/modal-viewer.component';

import { Image } from '../shared/models/image';

import { ImageService } from '../shared/services/image.service';

@Component({
    selector: 'gallery-page',
    templateUrl: './gallery-page.component.html',
    styleUrls: ['./gallery-page.component.css']
})

export class GalleryPageComponent implements OnInit {
    
    @ViewChild('modalViewer') modalViewer: ModalViewerComponent

    images: Image[];
    private errorMessage: string;

    constructor(
        private imageService: ImageService
    ) { }

    ngOnInit() {
        this.modalViewer.showImageTitle = true;
        this.loadImages();
    }

    openImageViewer(img  : any) {
        this.imageService.updateImages(this.images)
        this.imageService.updateSelectedImageIndex(this.images.indexOf(img))
        this.imageService.showImageViewer(true)
    }

    private loadImages() {
        this.imageService.getImages().subscribe(
            images => this.images = images,
            error => this.errorMessage = <any>error
        );
    }
}