import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';

import { DialogImageUploadComponent } from './dialog-image-upload.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdIconModule,
        MdDialogModule,
        MdInputModule,
        MdSelectModule
    ],
    exports: [DialogImageUploadComponent],
    entryComponents: [DialogImageUploadComponent],
    declarations: [DialogImageUploadComponent],
    providers: [],
})
export class DialogImageUploadModule { }
