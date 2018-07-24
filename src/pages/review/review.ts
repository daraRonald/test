import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WordpressProvider} from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  ordersData;
  chartLabels;
  chartValues;
  constructor(public navCtrl: NavController, public navParams: NavParams,public wordpressProvider: WordpressProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
    this.chartLabels = this.navParams.get('reviewlabel');
    this.chartValues = this.navParams.get('reviewqty');
	console.log(this.chartLabels);
	console.log(this.chartValues);
    
    this.defineChartData();
	//this.createBarChart();
  }


   defineChartData() : void
	   {
		  
		this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
           
            data: {
                labels: this.chartLabels,
                datasets: [{
                    label: this.chartValues,
                    data: this.chartValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384"
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ],
					borderWidth: 1
                }]
            },
             options : {
				  circumference: 2 * Math.PI,
				  rotation: Math.PI,
				  cutoutPercentage: 30,
				  legend: {
					display: true,
					position: 'left',
					
				  },
				  layout:{
					padding: -10,
				  }, 
				  animation: {
					animateRotate: true,
					animateScale: true
				  },
				  title: {
					display: true,
					text: 'Top Seller Rate During 1 Month.'
				  }
				  
			
			 }
 
        });
 
	   }
 
  
}
