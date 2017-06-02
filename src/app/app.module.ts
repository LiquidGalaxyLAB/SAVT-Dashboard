import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { SensorsComponent } from './sensors.component';
import { SensorService } from './sensor.service';

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule
  ],
  declarations: [ 
    AppComponent,
    SensorsComponent
  ],
  providers: [
    SensorService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
