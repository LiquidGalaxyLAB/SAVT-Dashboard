import { Component, OnInit } from '@angular/core';

import { Image } from '../../shared/models/image';
import { ImageService } from '../../shared/services/image.service';

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'image-importer',
    templateUrl: './image-importer.component.html',
    styleUrls: ['./image-importer.component.css']
})

export class ImageImporterComponent implements OnInit {

    title: string = 'Drone photos gallery';
    
    images: Image[];
    selectedImage: Image;
    
    width: number = 100;
    height: number = 100;

    constructor(
        private imageService: ImageService,
    ) { }

    ngOnInit() {
        this.getImages();
     }

    getImages(): void {
        this.imageService.getImages().subscribe(
            images => {
                this.images = images;
            },
            error => console.log(error)
        );
    }

    fileChangeEvent(fileInputEvent: any) {
        //console.log(fileInputEvent.target.files[0]);
        this.imageService.uploadImage(fileInputEvent.target.files[0]).then((result) => {
            console.log(result);
            this.getImages();
        }, (error) => {
            console.log(error);
        });
    }

    onSelect(image: Image) {
        console.log(image);
        this.selectedImage = image;
        this.imageService.addImageOverlay(image);
    }
}