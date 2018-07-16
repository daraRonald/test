import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ImageProvider } from '../../../providers/image/image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Transfer, TransferObject } from '@ionic-native/transfer';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';



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
			  public modalCtrl: ModalController,
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
				 let profileModal = this.modalCtrl.create('MediaPage');
				 profileModal.onDidDismiss(data => {
				   console.log(data);
				   this.imageUrl= data.guid.rendered;
				   this.pimageFile = data;
			     });
				 profileModal.present();
			  }
			},
			{
			  text: 'Upload File',
			  handler: () => {
				this._IMG.selectImage().then(data=>{
				
				   this.imageUrl= data;
				   this.uploadFile();
				});
			  }
			 },
			 {
			  text: 'Cancel',
			  role: 'cancel',
			  handler: () => {
				console.log('Cancel clicked');
			  }
			}
		  ]
		});
		actionSheet.present();
	  
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
  
  onCreateProduct(){
    this.wordpressProvider.createProduct(this.name, this.content,this.price,this.sale_price,this.pimageFile).subscribe(data => {
      console.log(data);
      alert('Product is created!');
      this.navCtrl.setRoot('WooListPage');
    });
  }

  
}
