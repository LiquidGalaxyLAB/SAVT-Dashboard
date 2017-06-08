import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from '../../components/app/app.component';
import { SensorsComponent } from '../../components/sensors/sensors.component';
import { SensorDetailComponent} from '../../components/sensor-detail/sensor-detail.component';

import { SensorService } from '../../services/sensor/sensor.service';

import { AppRoutingModule } from '../../modules/app-routing/app-routing.module';
import { MaterialModule } from '../../modules/material/material.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
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
