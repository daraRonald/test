import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController, LoadingController, ToastController  } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ImageProvider } from '../../../providers/image/image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';



@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {
  content;
  name;
  price;
  sale_price;
  image;
  pimage;
  pimageFile;
  
  imageUrl;
  imageData;
  hiddenImage= true;

  placeholder_picture = "assets/images/pimage.png";


  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private wordpressProvider: WordpressProvider,
			  public actionSheetCtrl: ActionSheetController,
			  private imagePicker: ImagePicker,
			  private _IMG: ImageProvider,
			  public loadingCtrl: LoadingController,
			  public toastCtrl: ToastController,
			  private transfer: Transfer, 
			  private _CAMERA : Camera) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
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
		this.pimageFile = JSON.parse(response);
		
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

  getPhoto() {
	  const actionSheet = this.actionSheetCtrl.create({
		  title: 'Upload Your Photo...',
		  buttons: [
			{
			  text: 'Media Library',
			  role: 'media',
			  handler: () => {
				this._IMG.selectImage()
				  .then((data) =>
				  {
					 this.image = data;
					 alert(this.image);
				  });
			  }
			},
			{
			  text: 'Upload File',
			  handler: () => {
				this.getImage();
			  }
			 },
			 {
			  text: 'Take Picture',
			  handler: () => {
				alert('Take Pic clicked');
			  }
			 },
			 {
			  text: 'Cancel',
			  role: 'cancel',
			  handler: () => {
				alert('Cancel clicked');
			  }
			}
		  ]
		});
		actionSheet.present();
	  
  }
  
  onCreateProduct(){
    this.wordpressProvider.createProduct(this.name, this.content,this.price,this.sale_price,this.pimage).subscribe(data => {
      console.log(data);
      alert('Product is created!');
      this.navCtrl.setRoot('WooListPage');
    });
  }

  
}
