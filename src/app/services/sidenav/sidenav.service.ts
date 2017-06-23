import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidenavService {
    private subject = new Subject();

    observableSubject = this.subject.asObservable();

    constructor() { }

    openSidenav() {
       this.subject.next();
    }
}