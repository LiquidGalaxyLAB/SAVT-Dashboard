import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ImageService } from '../../shared/services/image.service';

import { Author } from '../../shared/models/author';
import { Album } from '../../shared/models/album';
import { Image } from '../../shared/models/image';

@Component({
    selector: 'dialog-image-upload',
    templateUrl: './dialog-image-upload.component.html',
    styleUrls: ['./dialog-image-upload.component.css']
})

export class DialogImageUploadComponent implements OnInit {

    private inputFile: any;
    public queryAlbums: string[] = [];
    public queryAuthors: string[] = [];
    authors: Author[] = [];
    albums: Album[] = [];
    selectedAuthor: Object = {};
    selectedAlbum: Object = {};
    authorSelected: boolean = false;
    fileUploaded: boolean = false;
    fileName: string;
    private errorMessage: string;

    constructor(
        public dialogRef: MdDialogRef<DialogImageUploadComponent>,
        private imageService: ImageService,
    ) { }

    ngOnInit() {
        this.getAuthors();
     }

    onSelect(): void {
        this.getAlbums(this.selectedAuthor.toString());
        this.authorSelected = true;
    }

    fileChangeEvent(fileInputEvent: any) {
        this.inputFile = fileInputEvent;
        this.fileUploaded = true;
        this.fileName = this.inputFile.target.files[0].name;
    }

    saveImage(): void {
        var resultImageId: Image;
        this.imageService.uploadImage(this.inputFile.target.files[0]).then((result) => {
            this.imageService.uploadAlbum(this.selectedAlbum.toString())
        .subscribe(
            response => { 
                this.imageService.getImageById(result).subscribe( image => {
                    this.imageService.uploadOverlay(image).subscribe(
                        res => this.dialogRef.close(),
                        error => console.log(error)
                    )
                })
            },
            error => this.errorMessage = <any>error
            );
        }, (error) => {
            return console.log(error);
        });
    }

    private getAuthors(): void {
        this.imageService.getAuthors()
    .subscribe(
        authors => {this.fillAuthorsFilter(authors)},
        error => this.errorMessage = <any>error
        );
    }

    private getAlbums(authorName: string): void {
        this.imageService.getAuthorByName(authorName)
        .subscribe(
            author => {
                author.albums.forEach(albumId => {
                    this.queryAlbums = [];
                    this.imageService.getAlbumById(albumId)
                .subscribe(
                    album => this.queryAlbums.push(album.name),
                    error => this.errorMessage = <any>error
                    );
                });
            });
    }

    private fillAuthorsFilter(authors: Author[]) {
        this.queryAuthors = [];
        authors.forEach(
            author => this.queryAuthors.push(author.name)
        );
        
    }
}