import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MdToolbarModule} from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';

import { GoogleMapComponent } from './google-map.component';

@NgModule({
    imports: [
        CommonModule,
        MdToolbarModule,
        MdButtonModule,
        MdIconModule,
        AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrXPkbjPElzeunJujXskkqH-dsfcjqNHI'
        }),
    ],
    exports: [
        GoogleMapComponent
    ],
    declarations: [GoogleMapComponent],
    providers: [GoogleMapsAPIWrapper],
})
export class GoogleMapModule { }
