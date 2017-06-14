import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

import { DialogComponent } from '../../components/dialog/dialog.component';

@NgModule({
    imports: [
        MaterialModule,
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
