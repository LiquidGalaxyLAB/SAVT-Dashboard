import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import {MdSidenavModule} from '@angular/material';

@NgModule({
    imports: [
        MdButtonModule,
        MdIconModule,
        MdToolbarModule,
        MdSidenavModule
    ],
    exports: [
        ToolbarComponent
    ],
    declarations: [
        ToolbarComponent
    ],
    providers: [],
})
export class ToolbarModule { }
