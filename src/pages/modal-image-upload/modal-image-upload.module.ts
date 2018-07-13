import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalImageUploadPage } from './modal-image-upload';

@NgModule({
  declarations: [
    ModalImageUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalImageUploadPage),
  ],
})
export class ModalImageUploadPageModule {}
