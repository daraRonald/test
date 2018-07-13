import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';

@IonicPage()
@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {

  imageUrl;
  imageData;
  hiddenImage= true;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  private transfer: Transfer,
			  private _CAMERA : Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagePage');
  }
  
  getImage() {
	  const options: CameraOptions = {
		quality			   : 100,
		destinationType	   : this._CAMERA.DestinationType.DATA_URL,
		sourceType		   : this._CAMERA.PictureSourceType.CAMERA,
		allowEdit		   : false,
		targetWidth        : 512,
        targetHeight       : 512,
        encodingType       : this._CAMERA.EncodingType.PNG,
		correctOrientation : true
	  }

	  this._CAMERA.getPicture(options).then((imageData) => {
		this.imageData = imageData;
		this.imageUrl = "data:image/png;base64," + imageData;
		this.hiddenImage = false;
	  });
  }
  
  uploadFile() {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
		
	let trans = this.transfer.create();
	trans.upload(this.imageUrl , "https://mobileapp.tworksystem.org/wp-json/wp/v2/media", {
		headers : {
			"Authorization": `Bearer ${token}`,
			"content-disposition": "attachment; filename=\'tworksystem1.png\'",
		}
	}).then((res)=> {
		alert(JSON.stringify(res));
	}).catch((err)=> {
		alert(JSON.stringify(err));
	});
  }
}
