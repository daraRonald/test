import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-orderchart',
  templateUrl: 'orderchart.html',
})
export class OrderChartPage {
  @ViewChild('barChart') barChart;
  @ViewChild('lineCanvas') lineCanvas;
 
    
  lineChart: any;
  //barChart: any;
  
  ordersComplete : any	 = [];
  ordersProcessing : any = [];
  ordersCancelled : any	 = [];
  ordersOnhold : any	 = [];
  ordersPending : any	 = [];
  
  technologies				: any	 = [];
  chartLabels               : any    = [];
  chartValues               : any    = [];
  chartColours              : any    = [];
  chartHoverColours         : any    = [];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	let test=this.navParams.get('counts');
	console.log(test);
	let k:any;
	for(k in test) {
		if(test[k] == 'processing') {
			this.ordersProcessing.push('processing');
		}
		else if(test[k] == 'on-hold') {
			this.ordersOnhold.push('on-hold');
		}
		else if(test[k] == 'pending') {
			this.ordersPending.push('pending');
		}
		else if(test[k] == 'cancelled') {
			this.ordersCancelled.push('cancelled');
		}
		else if(test[k] == 'completed') {
			this.ordersComplete.push('completed');
		}
		
	}
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderchartPage');
	this.technologies = {
	   "technologies" : [
		  {
			 'technology' : 'Processing',
			 'time'       : this.ordersProcessing.length,
			 'color'      : 'rgba(4, 247, 61, 0.5)',
			 'hover'      : 'rgba(4, 247, 61, 1)'
		  },
		  {
			 'technology' : 'On-Hold',
			 'time'       : this.ordersOnhold.length,
			 'color'      : 'rgba(154, 28, 221, 0.5)',
			 'hover'      : 'rgba(154, 28, 221, 1)'
		  },
		  {
			 'technology' : 'Pending',
			 'time'       : this.ordersPending.length,
			 'color'      : 'rgba(221, 28, 56, 0.5)',
			 'hover'      : 'rgba(221, 28, 56, 1)'
		  },
		  {
			 'technology' : 'Cancelled',
			 'time'       : this.ordersCancelled.length,
			 'color'      : 'rgba(0, 0, 0, 0.5)',
			 'hover'      : 'rgba(0, 0, 0, 1)'
		  },
		  {
			 'technology' : 'Complete',
			 'time'       : this.ordersComplete.length,
			 'color'      : 'rgba(12, 101, 244, 0.5)',
			 'hover'      : 'rgba(12, 101, 244, 1)',
		  }
	   ]
	};
	console.log(this.technologies);
	
	this.defineChartData();
	this.createBarChart();
  }
  
  defineChartData() : void
   {
	  
	
      let k : any;

      for(k in this.technologies.technologies)
      {
         var tech  =      this.technologies.technologies[k];

         this.chartLabels.push(tech.technology);
         this.chartValues.push(tech.time);
         this.chartColours.push(tech.color);
         this.chartHoverColours.push(tech.hover);
      }
   }
 
  createBarChart()
	{
	   this.barChart	          = new Chart(this.barChart.nativeElement,
	   {
		  type: 'bar',
		  data: {
			 labels: this.chartLabels,
			 datasets: [{
				label                 : 'Order Details',
				data                  : this.chartValues,
				duration              : 2000,
				easing                : 'easeInQuart',
				backgroundColor       : this.chartColours,
				hoverBackgroundColor  : this.chartHoverColours
			 }]
		  },
		  options : {
			 
			 legend         : {
				display     : true,
				boxWidth    : 80,
				fontSize    : 15,
				padding     : 0
			 },
			 scales: {
				yAxes: [{
				   ticks: {
					  beginAtZero:true,  
				   }
				}],
				xAxes: [{
				   ticks: {
					  autoSkip: false
				   }
				}]
			 }
		  }
	   });
	}
}
