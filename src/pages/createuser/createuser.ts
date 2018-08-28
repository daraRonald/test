import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  selector: 'page-createuser',
  templateUrl: 'createuser.html',
})
export class CreateUserPage {
  
  type = 'password';
  showPass = false;
  
  role : any = 'customer';
  username;
  name;
  password;
  email;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public viewCtrl: ViewController,
			  private wordpressProvider: WordpressProvider,
			  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateuserPage');
  }

  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  
   onChange(value) {
		console.log(value);
	this.role = value;	
   }
  
   cancel() {
	 this.viewCtrl.dismiss();
   }
   
   createUser() {
	//alert('Username' + this.username + 'Name' + this.name + 'email' + this.email + 'password' + this.password + 'role' + this.role);
	this.wordpressProvider.createUsers(this.username, this.name ,this.email,this.password, this.role).subscribe(data => {
		  console.log(data);
		  alert(this.username + ' is created! Role with ' + this.role);
      this.navCtrl.setRoot('UserPage');
	});
   }
 
}
