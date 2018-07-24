import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  username;
  useremail;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
			  public statusBar: StatusBar, 
			  public splashScreen: SplashScreen, 
			  public alertCtrl: AlertController,
			  private authProvider: AuthProvider ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'TabsPage' },
      { title: 'Posts', component: 'PostsPage' },
      { title: 'Products', component: 'WooListPage' },
      { title: 'Orders', component: 'OrderPage' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.username= localStorage.getItem('userName');
      this.useremail= localStorage.getItem('userEmail');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  doLogout() {
    
	this.log();
  }
  
  log() {
	  const confirm = this.alertCtrl.create({
		  title: 'Logout Confirmation',
		  message: 'Are you sure to Logout?',
		  buttons: [
			{
			  text: 'Cancel',
			  handler: () => {
				console.log('Cancel');
				
			  }
			},
			{
			  text: 'Confirm',
			  handler: () => {

					localStorage.clear();
					this.nav.setRoot('LoginPage');
				
			  }
			}
		  ]
		});
		confirm.present();
  }
}
