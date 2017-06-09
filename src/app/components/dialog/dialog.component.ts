import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dialog',
    templateUrl: './dialog.component.html'
})

export class DialogComponent implements OnInit {
    message = 'KML Generated! Keep an eye to the Liquid Galaxy.'
    constructor() { }

    ngOnInit() { }
}