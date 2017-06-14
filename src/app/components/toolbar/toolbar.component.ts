import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar-style.css'],
})

export class ToolbarComponent implements OnInit {
    title = 'Smart Agro Visualization Tool'; 
    constructor(private router: Router ) { }

    ngOnInit() { }

    goToHome(): void {
        this.router.navigate(['/']);
    }
}