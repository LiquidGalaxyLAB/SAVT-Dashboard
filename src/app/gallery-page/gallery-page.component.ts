import { Component, OnInit, ViewChild } from '@angular/core';
import {MdDialog} from '@angular/material';

import { ModalViewerComponent } from './modal-viewer/modal-viewer.component';
import { DialogImageUploadComponent } from './dialog-image-upload/dialog-image-upload.component';

import { Author } from '../shared/models/author';
import { Album } from '../shared/models/album';
import { Image } from '../shared/models/image';

import { ImageService } from '../shared/services/image.service';

@Component({
    selector: 'gallery-page',
    templateUrl: './gallery-page.component.html',
    styleUrls: ['./gallery-page.component.css']
})

export class GalleryPageComponent implements OnInit {
    
    @ViewChild('modalViewer') modalViewer: ModalViewerComponent

    authors: Author[] = [];
    albums: Album[] = [];
    images: Image[] = [];
    selectedAuthor: Author;
    selectedAlbum: Album;

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
        this.selectedAuthor = undefined;
        this.selectedAlbum = undefined;
        this.modalViewer.showImageTitle = true;
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
        this.selectedAuthor = author;
        this.viewFlags.authorsView = false;
        this.viewFlags.albumsView = true;
        this.viewFlags.imagesView = false;
        this.getAlbums(author);
    }

    viewImages(album: Album) {
        this.selectedAlbum = album;
        this.viewFlags.authorsView = false;
        this.viewFlags.albumsView = false;
        this.viewFlags.imagesView = true;
        this.getImages(album);
    }

    openImageViewer(img  : any) {
        this.imageService.updateImages(this.images)
        this.imageService.updateSelectedImageIndex(this.images.indexOf(img))
        this.imageService.showImageViewer(true)
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