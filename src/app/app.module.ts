import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';

import { KmlGeneratorModule } from './kml-generator/kml-generator.module';
import { GraphsPageModule } from './graphs-page/graphs-page.module';
import { SensorDetailModule } from './sensor-detail/sensor-detail.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    KmlGeneratorModule,
    GraphsPageModule,
    SensorDetailModule,
  ],
  declarations: [ 
    AppComponent,
  ],
  providers: [
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
