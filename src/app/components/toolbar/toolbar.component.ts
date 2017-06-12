import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar-style.css'],
})

export class ToolbarComponent implements OnInit {
    title = 'SAVT Dashboard'; 
    constructor(
    ) { }

    ngOnInit() { }
}