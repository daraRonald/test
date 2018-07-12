import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {environment} from '../../envrionment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare var cordova: any;

@Injectable()
export class ImageProvider {
   
   lastImage: string = null;
   loading: Loading;
   api_url = environment.site_url+environment.data_url;
   cameraImage: string = null;
   
   constructor(public http     : Http,
               private _CAMERA : Camera,
               private transfer: Transfer, 
               private file: File, 
               private filePath: FilePath,
               public toastCtrl: ToastController, 
               public platform: Platform, 
               public loadingCtrl: LoadingController)
   {
   }


   selectImage() 
   {
      return new Promise(resolve => {
         let cameraOptions : CameraOptions = {
             sourceType         : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this._CAMERA.DestinationType.DATA_URL,
             quality            : 100,
             targetWidth        : 320,
             targetHeight       : 240,
             encodingType       : this._CAMERA.EncodingType.JPEG,
             mediaType          : this._CAMERA.MediaType.PICTURE,
             correctOrientation : true
         };

         this._CAMERA.getPicture(cameraOptions)
         .then((data) =>
         {
            this.cameraImage = "data:image/png;base64," + data;
            resolve(this.cameraImage);
         });
         
		this.uploadImages(this.cameraImage);
		});
	  
      
   }
   
   uploadImages(image) {
		let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
		console.log(token);

		let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`
		});
		
		const fileTransfer: TransferObject = this.transfer.create();
		fileTransfer.upload( image, this.api_url+'media', { headers : headers }).then(data => {
		
		this.loading.dismissAll()
		alert('Image succesful uploaded.');
	  }, err => {
		this.loading.dismissAll()
		alert('Error while uploading file.');
	  });
   }
   
  
}
