import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        MaterialModule,
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
