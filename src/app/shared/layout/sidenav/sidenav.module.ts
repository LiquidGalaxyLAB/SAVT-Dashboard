import { NgModule } from '@angular/core';
import { MdExpansionModule } from '@angular/material';

import { SidenavComponent } from './sidenav.component';

@NgModule({
    imports: [
        MdExpansionModule,
    ],
    exports: [
        SidenavComponent
    ],
    declarations: [SidenavComponent],
    providers: [],
})
export class SidenavModule { }
