import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

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
			  private imagePicker: ImagePicker,
			  private base64: Base64) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  }
  
  getPhoto() {
	  let options = {
		maximumImagesCount: 1
	  };
	  this.imagePicker.getPictures(options).then((results) => {
		for (var i = 0; i < results.length; i++) {
			this.image = results[i];
			alert(JSON.stringify(results));
			this.base64.encodeFile(results[i]).then((base64File: string) => {
			  this.image = base64File;
			}, (err) => {
			  console.log(err);
			});
		}
	  }, (err) => { });
	}

  onCreateProduct(){
    this.wordpressProvider.createProduct(this.name, this.content,this.price,this.sale_price,this.image).subscribe(data => {
      console.log(data);
    alert('Product is created!');
    this.navCtrl.setRoot('WooListPage');
    });
  }

  
}
