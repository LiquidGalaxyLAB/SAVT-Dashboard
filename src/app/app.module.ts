import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './app.component';
import { SensorsComponent } from './sensors.component';
import { SensorDetailComponent} from './sensor-detail.component';

import { SensorService } from './sensor.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule
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
