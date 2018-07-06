import { EditProductPage } from './editproduct';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
    EditProductPage,
    ],
    imports: [
        IonicPageModule.forChild(EditProductPage),
    ],
    exports: [
        EditProductPage
    ]
})

export class EditProductPageModule { };
