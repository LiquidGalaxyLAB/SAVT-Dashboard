import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';

import { ToolbarModule } from '../../modules/toolbar/toolbar.module';
import { DialogModule } from '../../modules/dialog/dialog.module';

@NgModule({
    imports: [
        MdListModule,
        MdCheckboxModule,
        MdButtonModule,
        MdToolbarModule,
        ToolbarModule,
        DialogModule,
        ],
    exports: [
        MdListModule,
        MdCheckboxModule,
        MdButtonModule,
        MdToolbarModule,
        ToolbarModule,
        DialogModule,
        ],
    providers: [],
})
export class MyMaterialModule { }
