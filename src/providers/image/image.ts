import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {environment} from '../../envrionment';

declare var cordova: any;

@Injectable()
export class ImageProvider {
   
   lastImage: string = null;
   loading: Loading;
   api_url = environment.site_url+environment.data_url;
   
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


   selectImage() : any
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
            this.cameraImage = "data:image/jpeg;base64," + data;
            return this.cameraImage;
            
            //this.filePath.resolveNativePath(data)
			//.then(filePath => {
			 // let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
			  //let currentName = data.substring(data.lastIndexOf('/') + 1, data.lastIndexOf('?'));
			  //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
			//});
         });

		}
      
   }
   
  createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}
	
  copyFileToLocalDir(namePath, currentName, newFileName) {
	  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
		this.lastImage = newFileName;
	  }, error => {
		this.presentToast('Error while storing file.');
	  });
	}
	
  presentToast(text) {
	  let toast = this.toastCtrl.create({
		message: text,
		duration: 3000,
		position: 'top'
	  });
	  toast.present();
	}
	
  pathForImage(img) {
	  if (img === null) {
		return '';
	  } else {
		return cordova.file.dataDirectory + img;
	  }
	}
	
  uploadImage() {
	  // Destination URL
	  var url = "https://www.royalhousefurniture.com/wp-admin/upload.php";
	 
	  // File for Upload
	  var targetPath = this.pathForImage(this.lastImage);
	 
	  // File name only
	  var filename = this.lastImage;
	 
	  var options = {
		fileKey: "file",
		fileName: filename,
		chunkedMode: false,
		mimeType: "multipart/form-data",
		params : {'fileName': filename}
	  };
	 
	  const fileTransfer: TransferObject = this.transfer.create();
	 
	  this.loading = this.loadingCtrl.create({
		content: 'Uploading...',
	  });
	  this.loading.present();
	 
	  // Use the FileTransfer to upload the image
	  fileTransfer.upload(targetPath, url, options).then(data => {
		
		this.loading.dismissAll()
		this.presentToast('Image succesful uploaded.');
	  }, err => {
		this.loading.dismissAll()
		this.presentToast('Error while uploading file.');
	  });
	}
	
   takePicture(): Promise<any>  {
            let options = {
                destinationType: this._CAMERA.DestinationType.FILE_URI,
                sourceType: 1,
                encodingType: 0,
                quality:100,
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
