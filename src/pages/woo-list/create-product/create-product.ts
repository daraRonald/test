import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController, LoadingController, ToastController  } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ImageProvider } from '../../../providers/image/image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the CreateQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  
  imageURI:any;
  imageFileName:any;

  placeholder_picture = "assets/images/pimage.png";


  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private wordpressProvider: WordpressProvider,
			  public actionSheetCtrl: ActionSheetController,
			  private imagePicker: ImagePicker,
			  private _IMG: ImageProvider,
			  public loadingCtrl: LoadingController,
			  private transfer: Transfer, 
			  private _CAMERA : Camera) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  }
  
  getImage() {
	  const options: CameraOptions = {
		quality: 100,
		destinationType: this._CAMERA.DestinationType.FILE_URI,
		sourceType: this._CAMERA.PictureSourceType.PHOTOLIBRARY
	  }

	  this._CAMERA.getPicture(options).then((imageData) => {
		this.imageURI = imageData;
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
		alert(token);
		
	  const fileTransfer: FileTransferObject = this.transfer.create();

	  let options: FileUploadOptions = {
		fileKey: 'ionicfile',
		fileName: 'ionicfile',
		chunkedMode: false,
		mimeType: "image/jpeg",
		headers: {'Content-Type': 'application/json',
				  'Authorization': `Bearer ${token}`}
	  }

	  fileTransfer.upload(this.imageURI, 'https://mobileapp.tworksystem.org/wp-json/wp/v2/media', options)
		.then((data) => {
		console.log(data+" Uploaded Successfully");
		this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
		loader.dismiss();
		this.presentToast("Image uploaded successfully");
	  }, (err) => {
		console.log(err);
		loader.dismiss();
		this.presentToast(err);
	  });
	}
	
  presentToast(msg) {
	  let toast = this.toastCtrl.create({
		message: msg,
		duration: 3000,
		position: 'bottom'
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
				this.selectImage();
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

  selectImage() {
      
         let cameraOptions : CameraOptions = {
             sourceType         : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this._CAMERA.DestinationType.DATA_URL,
             quality            : 100,
             targetWidth        : 320,
             targetHeight       : 240,
             encodingType       : this._CAMERA.EncodingType.PNG,
             mediaType          : this._CAMERA.MediaType.PICTURE,
             correctOrientation : true
         };

         this._CAMERA.getPicture(cameraOptions)
         .then((data) =>
         {
            this.pimage = "data:image/png;base64," + data;
         });
         
		
	  
      
   }
   
 
  
  onCreateProduct(){
    this.wordpressProvider.createProduct(this.name, this.content,this.price,this.sale_price,this.pimage).subscribe(data => {
      console.log(data);
      alert('Product is created!');
      this.navCtrl.setRoot('WooListPage');
    });
  }

  
}
