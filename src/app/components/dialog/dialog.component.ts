import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'message-dialog',
    templateUrl: './dialog.component.html'
})

export class DialogComponent implements OnInit {
    message = 'KML Generated! Keep an eye to the Liquid Galaxy.'
    constructor(public dialogRef: MdDialogRef<DialogComponent>) { }

    ngOnInit() { }
}