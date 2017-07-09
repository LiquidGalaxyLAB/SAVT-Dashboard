import { Component, OnInit } from '@angular/core';

import { ImageService } from '../../shared/services/image.service';

@Component({
    selector: 'image-importer',
    templateUrl: './image-importer.component.html',
    styleUrls: ['./image-importer.component.css']
})

export class ImageImporterComponent implements OnInit {
    constructor(
        private imageService: ImageService
    ) { }

    ngOnInit() { }

    fileChangeEvent(fileInputEvent: any) {
        //console.log(fileInputEvent.target.files[0]);
        this.imageService.uploadImage(fileInputEvent.target.files[0]).then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });
    }
}