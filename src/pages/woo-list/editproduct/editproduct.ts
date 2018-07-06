import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';

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
  placeholder_picture = "assets/images/pimage.png";
  
  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private wordpressProvider: WordpressProvider) 
  {
		this.product= navParams.get('editProduct');
		console.log(this.product);
		this.product_edit_form = this.formBuilder.group({
		  productname: new FormControl('', Validators.required),
		  productdescription : new FormControl('', Validators.required),
		  productprice: new FormControl('', Validators.required),
		  productsprice : new FormControl('', Validators.required)
		  
		});
  }

  ionViewWillEnter(){
   
    let loading = this.loadingCtrl.create();

    loading.present();    
    this.productname = this.product.name;
    this.productdescription = this.product.description;
    this.productprice = this.product.price;
    this.productsprice = this.product.sale_price;
    loading.dismiss();
    this.product_edit_form = this.formBuilder.group({
      productname: this.productname,
	  productdescription : this.productdescription,
	  productprice: this.productprice,
	  productsprice : this.productsprice
   	  
    });
  
    
  }
  
  updateProduct(values){
    this.wordpressProvider.editProduct(values, this.product.id).subscribe(data => {
		  console.log(data);
		alert('Product is Completely Edited!');
		this.navCtrl.setRoot('WooListPage');
		});
  }
  
}
