import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';

import { ToolbarModule } from '../../modules/toolbar/toolbar.module';
import { DialogModule } from '../../modules/dialog/dialog.module';
import { SidenavModule } from '../../modules/sidenav/sidenav.module';

@NgModule({
    imports: [
        MdListModule,
        MdCheckboxModule,
        MdButtonModule,
        ToolbarModule,
        DialogModule,
        SidenavModule
        ],
    exports: [
        MdListModule,
        MdCheckboxModule,
        MdButtonModule,
        ToolbarModule,
        DialogModule,
        SidenavModule
        ],
    providers: [],
})
export class MyMaterialModule { }
