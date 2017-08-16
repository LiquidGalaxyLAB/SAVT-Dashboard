import { NgModule } from '@angular/core';
import { MdButtonModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

import { DialogComponent } from './dialog.component';

@NgModule({
    imports: [
        MdButtonModule,
        MdDialogModule
    ],
    exports: [
        DialogComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    declarations: [
        DialogComponent
    ],
    providers: [],
})
export class DialogModule { }
