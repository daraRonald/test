import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, , LoadingController, ToastController } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ImageProvider } from '../../../providers/image/image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  imageURI:any;
  imageFileName:any;
  placeholder_picture = "assets/images/pimage.png";


  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private wordpressProvider: WordpressProvider,
			  public actionSheetCtrl: ActionSheetController,
			  private imagePicker: ImagePicker,
			  private _IMG: ImageProvider,
			  private transfer: FileTransfer,
			  public loadingCtrl: LoadingController,
			  public toastCtrl: ToastController,
			  private _CAMERA : Camera) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
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
					 //this.image = data;
					 alert(data);
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
             destinationType    : this._CAMERA.DestinationType.FILE_URI,
             quality            : 100,
             targetWidth        : 512,
             targetHeight       : 512,
         };

         this._CAMERA.getPicture(cameraOptions)
         .then((data) =>
         {
           this.imageURI = data;
         },(err) => {
			console.log(err);
			this.presentToast(err);
		  });	  
      
   }
   
   uploadFile() {
	  let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
		alert(token);
		
		let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`
		});
	  
	  let loader = this.loadingCtrl.create({
		content: "Uploading..."
	  });
	  loader.present();
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
		this.imageFileName = "";
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
		  duration: 6000,
		  position: 'bottom'
		});

		toast.onDidDismiss(() => {
		  console.log('Dismissed toast');
		});

		toast.present();
	}
   
  
  
  onCreateProduct(){
    this.wordpressProvider.createProduct(this.name, this.content,this.price,this.sale_price,this.imageURI).subscribe(data => {
      console.log(data);
      alert('Product is created!');
      this.navCtrl.setRoot('WooListPage');
    });
  }

  
}
