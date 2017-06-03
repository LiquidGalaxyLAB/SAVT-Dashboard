import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { SensorsComponent } from './sensors.component';
import { SensorDetailComponent} from './sensor-detail.component';

import { SensorService } from './sensor.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    SensorsComponent,
    SensorDetailComponent
  ],
  providers: [
    SensorService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
