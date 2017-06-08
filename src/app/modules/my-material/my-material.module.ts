import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        MdListModule,
        MdToolbarModule
        ],
    exports: [
        MdListModule,
        MdToolbarModule
        ],
    providers: [],
})
export class MyMaterialModule { }
