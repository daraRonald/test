import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;

  categoryId: number;
  categoryTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpressProvider: WordpressProvider
  ) {}

  ionViewWillEnter() {
    
    this.morePagesAvailable = true;

    //if we are browsing a category
    this.categoryId = this.navParams.get('id');
    this.categoryTitle = this.navParams.get('title');

    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressProvider.getRecentPosts(this.categoryId)
      .subscribe(data => {
		let posts : any = data;
        for(let post of posts){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }

  postTapped(event, post) {
		this.navCtrl.push('PostPage', {
		  item: post
		});
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpressProvider.getRecentPosts(this.categoryId, page)
    .subscribe(data => {
      let posts : any = data;
      for(let post of posts){
        if(!loading){
          infiniteScroll.complete();
        }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
        this.posts.push(post);
        loading = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

}
