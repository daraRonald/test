import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WordpressProvider} from '../../providers/wordpress/wordpress';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  
  dataObject;
  technologies				: any	 = [];
  Object = Object;
  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpressProvider: WordpressProvider) {
	
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
	
	this.wordpressProvider.getReports().subscribe(data => {
      console.log(data);
      this.dataObject = data;
      this.technologies = data;
     
    });
    
	this.defineChartData();
	//this.createBarChart();
  }

  defineChartData() : void
   {
	  
	
      let k : any;

      for(k in this.technologies)
      {
         var tech  =      this.technologies[k];

        
      }
   }
 
  createBarChart()
	{
	   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
 
        });
        
	}
}

