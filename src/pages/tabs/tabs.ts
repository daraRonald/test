import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root;
  tab2Root;
  tab3Root;
  
  fooId;
  ordersData;
  productsData;
  
  chartLabels               : any    = [];
  chartValues               : any    = [];
  chartValuesReview         : any    = [];
  
  constructor(public wordpressProvider: WordpressProvider, 
			  public loadingCtrl: LoadingController,
			  public params: NavParams) {
	console.log('ionViewDidLoad TabPageCon');

	let loading = this.loadingCtrl.create();
    loading.present();
    
	this.wordpressProvider.getOrders().subscribe(data => {
      console.log(data);
      this.ordersData= data;
      let i : any;

      for(i in this.ordersData)
      {
         var tech  =      this.ordersData[i];

         console.log(tech.status);
         this.chartValues.push(tech.status);
         
      }
    });
   	
	setTimeout(() => {
		loading.dismiss();
	  }, 5000);

	this.wordpressProvider.getTopseller().subscribe(data => {
      console.log(data);
      this.ordersData= data;
      let k:any;
		for(k in this.ordersData) {
			var tech  =      this.ordersData[k];

			 console.log(tech);
			this.chartLabels.push(tech.name);
			this.chartValuesReview.push(tech.quantity);
			
		}
    });
    
	this.fooId = {
		counts: this.chartValues,
		reviewlabel : this.chartLabels,
		reviewqty : this.chartValuesReview

	  }
	
	this.tab1Root = 'DashboardPage';
	this.tab2Root = 'OrderChartPage';
	this.tab3Root = 'ReviewPage';
 
  }
}

