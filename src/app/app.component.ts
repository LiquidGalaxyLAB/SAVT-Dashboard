import { Component, ViewChild } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { SidenavService } from './shared/services/sidenav.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  { 
  title = 'SAVT Dashboard';
  @ViewChild('sidenav') sidenav: any;
  subscription: Subscription;

  constructor(private sidenavService: SidenavService) {
    sidenavService.observableSubject$.subscribe(
      bool => {
        if (bool) this.sidenav.open();
        else this.sidenav.close();
      }
    )
   }


  ngOnInit() { }

}
