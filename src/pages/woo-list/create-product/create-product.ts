import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ImageProvider } from '../../../providers/image/image';

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
			  private base64: Base64) {}

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
				this._IMG.uploadImage();
			  }
			 },
			 {
			  text: 'Take Picture',
			  handler: () => {
				this._IMG.takePicture()
				  .then((data) =>
				  {
					 this.image = data;
					 alert(this.image);
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

  onCreateProduct(){
    this.wordpressProvider.createProduct(this.name, this.content,this.price,this.sale_price,this.image).subscribe(data => {
      console.log(data);
      alert('Product is created!');
      this.navCtrl.setRoot('WooListPage');
    });
  }

  
}
