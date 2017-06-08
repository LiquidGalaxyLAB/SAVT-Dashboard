import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';
import { ToolbarModule } from '../../modules/toolbar/toolbar.module';

@NgModule({
    imports: [
        MdListModule,
        ToolbarModule
        ],
    exports: [
        MdListModule,
        ToolbarModule
        ],
    providers: [],
})
export class MyMaterialModule { }
