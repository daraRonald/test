import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';


@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  media : any;
  grid: Array<Array<string>>;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  private wordpressProvider: WordpressProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPage');
    this.getMedia();
  }

   getMedia() {
    console.log('getmedia is work');
	this.wordpressProvider.getMedia().subscribe(data => {
      console.log(data);
      this.media = data;
      
    });
    
    
  }
}
