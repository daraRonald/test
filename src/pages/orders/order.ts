import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  orders: any;
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;
  categoryId: number;
  categoryTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpressProvider: WordpressProvider,
    
  ) {}

  ionViewWillEnter() {
      
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressProvider.getOrders().subscribe(data => {
      console.log(data);
      this.orders = data;
	  });
      loading.dismiss();
      
	  
  }

  
  
  itemTapped(event, order) {
		this.navCtrl.push('OrderDetailPage', {order});
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.orders.length/10)) + 1;
    let loading = true;

    this.wordpressProvider.getOrders(page)
    .subscribe(data => {
    let orders : any = data;
      for(let order of orders){
        if(!loading){
          infiniteScroll.complete();
        }

        
        loading = false;
        this.morePagesAvailable = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

}
