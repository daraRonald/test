import { EditPostPage } from './editpost';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
    EditPostPage,
    ],
    imports: [
        IonicPageModule.forChild(EditPostPage),
    ],
    exports: [
        EditPostPage
    ]
})

export class EditPostPageModule { };
