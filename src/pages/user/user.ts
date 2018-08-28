import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  users : any;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  public loadingCtrl: LoadingController,
			  public wordpressProvider: WordpressProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressProvider.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
	  });
      loading.dismiss();
  }
  
  onGoToCreateUser() {
	this.navCtrl.push('CreateUserPage');
  }

}
