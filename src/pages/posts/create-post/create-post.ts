import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../../providers/wordpress/wordpress';

/**
 * Generated class for the CreateQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {
  content;
  title;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wordpressProvider: WordpressProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuotePage');
  }

  onAddPost(){
    this.wordpressProvider.createPost(this.title, this.content).subscribe(data => {
      console.log(data);
    alert('Post is created!');
    this.navCtrl.setRoot('PostsPage');
    });
  }

}
