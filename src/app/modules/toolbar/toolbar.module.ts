import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@NgModule({
    imports: [
        MdToolbarModule
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
