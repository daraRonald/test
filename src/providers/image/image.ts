import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {environment} from '../../envrionment';

@Injectable()
export class ImageProvider {
   
   lastImage: string = null;
   loading: Loading;
   api_url = environment.site_url+environment.data_url;
   cameraImage;
   pimageFile;
   constructor(public http     : Http,
               private _CAMERA : Camera,
               private transfer: Transfer, 
               public toastCtrl: ToastController, 
               public platform: Platform, 
               public loadingCtrl: LoadingController)
   {
   }


   selectImage() 
   {
      return new Promise(resolve => {
         let cameraOptions : CameraOptions = {
			quality			   : 100,
			destinationType	   : this._CAMERA.DestinationType.DATA_URL,
			sourceType		   : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
			allowEdit		   : false,
			targetWidth        : 512,
			targetHeight       : 512,
			encodingType       : this._CAMERA.EncodingType.JPEG,
			mediaType          : this._CAMERA.MediaType.PICTURE,
			correctOrientation : true,
         };

         this._CAMERA.getPicture(cameraOptions)
         .then((data) =>
         {
            this.cameraImage = "data:image/jpeg;base64," + data;
            
            resolve(this.cameraImage);
            
		  });
         
        
		});
	  
      
   }
     
}
