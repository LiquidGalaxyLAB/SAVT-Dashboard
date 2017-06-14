import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'message-dialog',
    templateUrl: './dialog.component.html'
})

export class DialogComponent implements OnInit {
    title = 'Generate KML'
    message = 'Are you sure to generate this KML ?'
    constructor(public dialogRef: MdDialogRef<DialogComponent>) { }

    ngOnInit() { }
}