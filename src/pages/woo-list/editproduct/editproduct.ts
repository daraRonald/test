import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, IonicPage, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ImageProvider } from '../../../providers/image/image';
import { Transfer, TransferObject } from '@ionic-native/transfer';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@IonicPage()
@Component({
  selector: 'page-editproduct',
  templateUrl: 'editproduct.html'
})
export class EditProductPage {
   product_edit_form: FormGroup;
 
  
  id : any;
  
  pid :any;
  product : any;
  productname :string; 
  productdescription : string; 
  productprice :any;
  productsprice : any;	
  productimage : any;
  productimageNew : any;	
  pimage : any;  
  pimageFile: any;
  placeholder_picture = "assets/images/pimage.png";
  
  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public _IMG: ImageProvider,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	private transfer: Transfer,
	public modalCtrl: ModalController,
    private wordpressProvider: WordpressProvider) 
  {
		this.product= navParams.get('editProduct');
		console.log(this.product);
		this.product_edit_form = this.formBuilder.group({
		  productname: new FormControl('', Validators.required),
		  productdescription : new FormControl('', Validators.required),
		  productprice: new FormControl('', Validators.required),
		  productsprice : new FormControl('', Validators.required),
		  productimage : new FormControl('', Validators.required)
		});
  }

  ionViewWillEnter(){
   
    let loading = this.loadingCtrl.create();

    loading.present();    
    this.productname = this.product.name;
    this.productdescription = this.product.description;
    this.productprice = this.product.price;
    this.productsprice = this.product.sale_price;
    this.pimage = this.product.images;
    this.productimage = this.pimage[0]['src'];
    loading.dismiss();
    this.product_edit_form = this.formBuilder.group({
      productname: this.productname,
	  productdescription : this.productdescription,
	  productprice: this.productprice,
	  productsprice : this.productsprice,
	  productimage : this.productimage
   	  
    });
  
    
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
				   if(data != null) {
					 this.productimageNew = data.guid.rendered;
					 this.pimageFile = data;
				   }
			     });
				 profileModal.present();
			  }
			},
			{
			  text: 'Upload File',
			  handler: () => {
				this._IMG.selectImage().then(data=>{
				
				   this.productimageNew = data;
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
	  
		trans.upload(this.productimage , "https://mobileapp.tworksystem.org/wp-json/wp/v2/media", { headers : {
			"Authorization": `Bearer ${token}`,
			"content-disposition": "attachment; filename=\'tworksystem.jpeg\'"
		} }).then((res)=> {
			let response = res.response;
			this.pimageFile = JSON.parse(response);
			alert(JSON.stringify(this.pimageFile));
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

  updateProduct(values){
    this.wordpressProvider.editProduct(values, this.pimage, this.pimageFile, this.product.id).subscribe(data => {
		  console.log(data);
		alert('Product is Completely Edited!');
		this.navCtrl.setRoot('WooListPage');
		});
  }
  
}
