import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  posts;
  morePagesAvailable: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private wordpressProvider: WordpressProvider) {
    
    this.wordpressProvider.getPosts().subscribe(data => {
      console.log(data);
      this.posts = data;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

  onShowPostDetail(post){
    this.navCtrl.push('PostDetailPage', {post});
  }

  onGoToCreatePost(){
    this.navCtrl.push('CreatePostPage');
  }
  
  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpressProvider.getPosts(page)
    .subscribe(data => {
    let posts : any = data;
      for(let post of posts){
        if(!loading){
          infiniteScroll.complete();
        }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
        this.posts.push(post);
        loading = false;
        this.morePagesAvailable = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

}
