import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

import { AppComponent }  from '../../components/app/app.component';
import { SensorsComponent } from '../../components/sensors/sensors.component';
import { SensorInfoComponent } from '../../components/sensor-info/sensor-info.component';
import { SensorDetailComponent} from '../../components/sensor-detail/sensor-detail.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { GoogleMapComponent } from '../../components/google-map/google-map.component';

import { SensorService } from '../../services/sensor/sensor.service';

import { AppRoutingModule } from '../../modules/app-routing/app-routing.module';
import { MyMaterialModule} from '../../modules/my-material/my-material.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrXPkbjPElzeunJujXskkqH-dsfcjqNHI'
    }),
    MaterialModule,
    AppRoutingModule,
    MyMaterialModule
  ],
  declarations: [ 
    AppComponent,
    SensorsComponent,
    SensorInfoComponent,
    SensorDetailComponent,
    BarChartComponent,
    GoogleMapComponent
  ],
  providers: [
    SensorService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
