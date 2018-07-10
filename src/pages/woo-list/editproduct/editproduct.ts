import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

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
  pimage : any;  
  placeholder_picture = "assets/images/pimage.png";
  
  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private imagePicker: ImagePicker,
    private base64: Base64,
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
	  let options = {
		maximumImagesCount: 1
	  };
	  this.imagePicker.getPictures(options).then((results) => {
		for (var i = 0; i < results.length; i++) {
			this.productimage = results[i];
			alert(JSON.stringify(this.productimage));
			this.base64.encodeFile(results[i]).then((base64File: string) => {
			  this.productimage = base64File;
			}, (err) => {
			  console.log(err);
			});
		}
	  }, (err) => { });
	}

  updateProduct(values){
    this.wordpressProvider.editProduct(values, this.product.id).subscribe(data => {
		  console.log(data);
		alert('Product is Completely Edited!');
		this.navCtrl.setRoot('WooListPage');
		});
  }
  
}
