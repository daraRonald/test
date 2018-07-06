import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';

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

  name : string;
  
  postname :string;
 
  postdescription : string;
 
  post : any;	  
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
		  postname: new FormControl('', Validators.required),
		  postdescription : new FormControl('', Validators.required),
		  
		});
  }

  ionViewWillEnter(){
   
    let loading = this.loadingCtrl.create();

    loading.present();    
    this.name = this.post['title'];
    this.postname = this.name['rendered'];
    let content = this.post['content'];
    this.postdescription = content['rendered'];
    loading.dismiss();
    this.post_edit_form = this.formBuilder.group({
      
      postname : this.postname,
	  
	  postdescription : this.postdescription,
	  
    });
  
    
  }
  
  updatePost(values){
    this.wordpressProvider.editPost(values, this.post.id).subscribe(data => {
		  console.log(data);
		alert('Post is Completely Edited!');
		this.navCtrl.setRoot('PostsPage');
		});
  }
  
}
