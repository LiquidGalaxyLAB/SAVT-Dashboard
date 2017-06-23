import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService } from '../../services/sidenav/sidenav.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar-style.css'],
})

export class ToolbarComponent implements OnInit {
    title = 'Smart Agro Visualization Tool'; 
    constructor(
        private router: Router,
        private sidenavService: SidenavService,
     ) { }

    ngOnInit() { }

    openSidenav(): void {
        this.sidenavService.openSidenav();
    }
    
    goToHome(): void {
        this.router.navigate(['/']);
    }
}