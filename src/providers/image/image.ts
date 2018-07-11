import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class ImageProvider {

   public cameraImage : String;

   constructor(public http     : Http,
               private _CAMERA : Camera)
   {
   }


   selectImage() : Promise<any>
   {
      return new Promise(resolve =>
      {
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
            this.cameraImage 	= "data:image/jpeg;base64," + data;
            resolve(this.cameraImage);
         });


      });
   }

   takePicture(): Promise<any>  {
            let options = {
                destinationType: this._CAMERA.DestinationType.FILE_URI,
                sourceType: 1,
                encodingType: 0,
                quality:50,
                allowEdit: false,
                saveToPhotoAlbum: false,            
                correctOrientation: true,
            };        
            return this._CAMERA.getPicture(options).then((imgUrl) => {
                return imgUrl;
               
            }, (err) => {                
                if(err.error == "cordova_not_available") {
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");            
                } else {
                    console.log("Failed to open camera: " + err.error);                
                }    
            });
        } 
}
