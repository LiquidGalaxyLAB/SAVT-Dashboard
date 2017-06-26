import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidenavService {
    private sidenavSubject = new Subject<boolean>();

    observableSubject$ = this.sidenavSubject.asObservable();

    constructor() { }

    openSidenav() {
       this.sidenavSubject.next(true);
    }

    closeSidenav() {
        this.sidenavSubject.next(false);
    }
}