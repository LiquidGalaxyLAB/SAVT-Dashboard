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
    sidenavOpened: boolean;
    constructor(
        private router: Router,
        private sidenavService: SidenavService,
     ) { }

    ngOnInit() {
        this.sidenavOpened = false;
     }

    sidenavButton(): void {
        if (this.sidenavOpened) {
            this.sidenavOpened = false;
            this.sidenavService.closeSidenav();
        }
        else {
            this.sidenavOpened = true;
            this.sidenavService.openSidenav();
        }
    }
    
    goToHome(): void {
        this.router.navigate(['/']);
    }
}