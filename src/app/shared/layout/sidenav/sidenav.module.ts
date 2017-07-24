import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';
import { MdIconModule } from '@angular/material';

import { SidenavComponent } from './sidenav.component';

@NgModule({
    imports: [
        MdListModule,
        MdIconModule
    ],
    exports: [
        SidenavComponent
    ],
    declarations: [SidenavComponent],
    providers: [],
})
export class SidenavModule { }
