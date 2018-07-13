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
			  public loadingCtrl: LoadingController,
			  public toastCtrl: ToastController,
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
		sourceType		   : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
		allowEdit		   : false,
		targetWidth        : 512,
        targetHeight       : 512,
        encodingType       : this._CAMERA.EncodingType.JPEG,
        mediaType          : this._CAMERA.MediaType.PICTURE,
		correctOrientation : true
	  }

	  this._CAMERA.getPicture(options).then((imageData) => {
		this.imageData = imageData;
		this.imageUrl = "data:image/jpeg;base64," + imageData;
		this.hiddenImage = false;
	  }, (err) => {
		console.log(err);
		this.presentToast(err);
	  });
  }
  
  uploadFile() {
    let loader = this.loadingCtrl.create({
		content: "Uploading..."
	  });
	  loader.present();
	  
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
		
	let trans = this.transfer.create();
  
	trans.upload(this.imageUrl , "https://mobileapp.tworksystem.org/wp-json/wp/v2/media", { headers : {
		"Authorization": `Bearer ${token}`,
		"content-disposition": "attachment; filename=\'tworksystem1.jpeg\'"
	} }).then((res)=> {
		let response = res.response;
		alert(JSON.stringify(response));
		loader.dismiss();
		this.presentToast("Image uploaded successfully");
	}).catch((err)=> {
		loader.dismiss();
		this.presentToast(err);
	});
  }
  
  presentToast(msg) {
	  
	  let toast = this.toastCtrl.create({
		message: msg,
		duration: 3000,
		position: 'top'
	  });

	  toast.onDidDismiss(() => {
		console.log('Dismissed toast');
	  });

	  toast.present();
  }
}
