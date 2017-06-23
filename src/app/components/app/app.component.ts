import { Component, ViewChild } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { SidenavService } from '../../services/sidenav/sidenav.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  { 
  title = 'SAVT Dashboard';
  @ViewChild('sidenav') sidenav: any;
  subscription: Subscription;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.subscription = this.sidenavService.observableSubject.subscribe({
      next: this.sidenav.open()
    });
  }

}
