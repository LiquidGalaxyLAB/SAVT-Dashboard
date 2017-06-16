import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MdToolbarModule} from '@angular/material';

import { GoogleMapComponent } from '../../components/google-map/google-map.component';

@NgModule({
    imports: [
        CommonModule,
        MdToolbarModule,
        AgmCoreModule
    ],
    exports: [
        GoogleMapComponent
    ],
    declarations: [GoogleMapComponent],
    providers: [],
})
export class GoogleMapModule { }
