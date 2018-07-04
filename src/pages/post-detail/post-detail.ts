import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

/**
 * Generated class for the QuotesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {
 
  post: any;
  user: string;
  comments: any[];
  categories: Array<any> = new Array<any>();
  constructor(public navCtrl: NavController, public navParams: NavParams, private wordpressProvider: WordpressProvider) {
    this.post = this.navParams.get('post');
    console.log(this.post);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
    
    Observable.forkJoin(
      this.getAuthorData(),
      this.getCategories(),
      this.getComments())
      .subscribe(data => {
        this.user = data[0]['name'];
        this.categories = data[1];
        this.comments = data[2];
        
      });
  }
  
  getAuthorData(){
    return this.wordpressProvider.getAuthor(this.post.author);
  }

  getCategories(){
    return this.wordpressProvider.getPostCategories(this.post);
  }

  getComments(){
    return this.wordpressProvider.getComments(this.post.id);
  }
  
  loadMoreComments(infiniteScroll) {
    let page = (this.comments.length/10) + 1;
    this.wordpressProvider.getComments(this.post.id, page)
    .subscribe(data => {
      for(let item of data){
        this.comments.push(item);
      }
      infiniteScroll.complete();
    }, err => {
      console.log(err);
      this.morePagesAvailable = false;
    })
  }
  
  deletePost(id) {
		
		this.wordpressProvider.deletePost(id).subscribe(data => {
		  console.log(data);
		alert('Product is Completely Deleted!');
		this.navCtrl.setRoot('PostsPage');
		});
	}
	
  editPost(post:any) {
		this.navCtrl.setRoot('EditPostPage', {post});
  }

}
