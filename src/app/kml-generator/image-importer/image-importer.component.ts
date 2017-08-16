import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';

import { ImageService } from '../../shared/services/image.service';
import { DialogImageUploadComponent } from '../dialog-image-upload/dialog-image-upload.component';

import { Image } from '../../shared/models/image';
import { Author } from '../../shared/models/author';
import { Album } from '../../shared/models/album';

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'image-importer',
    templateUrl: './image-importer.component.html',
    styleUrls: ['./image-importer.component.css']
})

export class ImageImporterComponent implements OnInit {

    title: string = 'Drone photos gallery';
    
    selectedImage: Image;
    authors: Author[] = [];
    albums: Album[] = [];
    images: Image[] = [];

    width: number = 100;
    height: number = 100;

    viewFlags = {
        "authorsView": false,
        "albumsView": false,
        "imagesView": false,
    }

    private errorMessage: string;

    constructor(
        private imageService: ImageService,
        public dialog: MdDialog,
    ) { }

    ngOnInit() {
        this.viewFlags.authorsView = true;
        this.getAuthors();
     }

    openUploadDialog(): void {
        this.dialog.open(DialogImageUploadComponent);
    }

    selectView(view: string) {
        this.allFlagsFalse();
        this.viewFlags[view] = true;
    }

    viewAlbums(author: Author) {
        this.viewFlags.authorsView = false;
        this.viewFlags.albumsView = true;
        this.viewFlags.imagesView = false;
        this.getAlbums(author);
    }

    viewImages(album: Album) {
        this.viewFlags.authorsView = false;
        this.viewFlags.albumsView = false;
        this.viewFlags.imagesView = true;
        this.getImages(album);
    }

    onSelect(image: Image) {
        console.log(image);
        this.selectedImage = image;
        this.imageService.addImageOverlay(image);
    }

    private allFlagsFalse(): void {
        this.viewFlags.authorsView = false;
        this.viewFlags.albumsView = false;
        this.viewFlags.imagesView = false;
    }

    private getAuthors(): void {
        this.imageService.getAuthors()
    .subscribe(
        authors => this.authors = authors,
        error => this.errorMessage = <any>error
        );
    }

    private getAlbums(author: Author): void {
        this.albums.splice(0, this.albums.length);
        author.albums.forEach(album => {
            this.imageService.getAlbumById(album)
        .subscribe(
            album => this.albums.push(album),
            error => this.errorMessage = <any>error
            );
        });
    }

    private getImages(album: Album): void {
        this.images.splice(0, this.images.length);
        album.images.forEach(image => {
            this.imageService.getImageById(image)
        .subscribe(
            image => this.images.push(image),
            error => this.errorMessage = <any>error
            );
        });
    }
}
