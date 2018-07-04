import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@IonicPage()
@Component({
  selector: 'page-editpost',
  templateUrl: 'editpost.html'
})
export class EditPostPage {
   post_edit_form: FormGroup;
 
  post: Array<any> = new Array<any>();
  id : any;
  
  pid :any;
  pname :string;
 
  pdescription : string;
 
		  
  placeholder_picture = "assets/images/pimage.png";
  
  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private wordpressProvider: WordpressProvider) 
  {
		this.post= navParams.get('post');
		console.log(this.post);
		this.post_edit_form = this.formBuilder.group({
		  pname: new FormControl('', Validators.required),
		  pdescription : new FormControl('', Validators.required),
		  
		});
  }

  ionViewWillEnter(){
   
    let loading = this.loadingCtrl.create();

    loading.present();    
    this.pname = this.post['title'].rendered;
    this.pdescription = this.post['content'].rendered;
    loading.dismiss();
    this.post_edit_form = this.formBuilder.group({
      
      pname : this.pname,
	  
	  pdescription : this.pdescription,
	  
    });
  
    
  }
  
  updateProduct(values){
    this.wordpressProvider.editPost(values, this.post['id']).subscribe(data => {
		  console.log(data);
		alert('Post is Completely Edited!');
		this.navCtrl.setRoot('PostsPage');
		});
  }
  
}
