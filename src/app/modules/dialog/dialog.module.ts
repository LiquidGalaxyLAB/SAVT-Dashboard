import { NgModule } from '@angular/core';
import { MdDialogModule } from '@angular/material';

import { DialogComponent } from '../../components/dialog/dialog.component';

@NgModule({
    imports: [
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
