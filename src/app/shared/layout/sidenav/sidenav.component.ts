import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService } from '../../services/sidenav.service';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
    constructor(
        private router: Router,
        private sidenavService: SidenavService
    ) { }

    ngOnInit() { }

    goToSensors() {
        this.router.navigate(['/sensors']);
    }

    goToImages() {
        this.router.navigate(['/gallery']);
    }

    goToKmlGenerator() {
        this.router.navigate(['/']);
    }

    goToAbout() {
        this.sidenavService.closeSidenav();
        //this.router.navigate(['/about']);
    }
}