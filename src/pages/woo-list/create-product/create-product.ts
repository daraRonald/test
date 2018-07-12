import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController, LoadingController } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ImageProvider } from '../../../providers/image/image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Transfer, TransferObject } from '@ionic-native/transfer';

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
            this.image = "data:image/png;base64," + data;
         });
         
		
	  
      
   }
   
  uploadImages() {
		let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
		alert(token);

		let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'content-disposition': "attachment; filename=\'twork1.png\'",
		  'Authorization': `Bearer ${token}`
		});
		
		const fileTransfer: TransferObject = this.transfer.create();
		
		fileTransfer.upload( this.image, 'https://mobileapp.tworksystem.org/wp-json/wp/v2/media', { headers : headers }).then(data => {
		
		
		alert(JSON.stringify(data));
	  }, err => {
		
		alert(JSON.stringify(err));
	  });
   }
  
  onCreateProduct(){
    this.wordpressProvider.createProduct(this.name, this.content,this.price,this.sale_price,this.image).subscribe(data => {
      console.log(data);
      alert('Product is created!');
      this.navCtrl.setRoot('WooListPage');
    });
  }

  
}
