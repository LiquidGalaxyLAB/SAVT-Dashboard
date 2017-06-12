import { NgModule } from '@angular/core';
import { MdSidenavModule } from '@angular/material';

import { SidenavComponent } from '../../components/sidenav/sidenav.component';

@NgModule({
    imports: [
        MdSidenavModule
    ],
    exports: [
        SidenavComponent
    ],
    declarations: [
        SidenavComponent
        ],
    providers: [],
})
export class SidenavModule { }
