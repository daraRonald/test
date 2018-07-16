import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { WordpressProvider} from '../../providers/wordpress/wordpress';


@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {
  autoManufacturers;
  media;
  mimage : any;
  morePagesAvailable: boolean = true;
  grid: Array<Array<string>>;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public viewCtrl: ViewController,
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
  
  dismiss() {
  
   console.log(this.autoManufacturers);
   this.wordpressProvider.getMediaByID(this.autoManufacturers).subscribe(data => {
      this.mimage = data;
      console.log(this.mimage);
  
   this.viewCtrl.dismiss(this.mimage);
   });
 }
 
 cancel() {
	this.viewCtrl.dismiss();
 }
 
  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.media.length/16)) + 1;
    let loading = true;

    this.wordpressProvider.getMedia(page)
    .subscribe(data => {
    let med : any = data;
      for(let m of med){
        if(!loading){
          infiniteScroll.complete();
        }
        m.description.rendered = m.description.rendered.split('<a')[0] + "</p>";
        this.media.push(m);
        loading = false;
        this.morePagesAvailable = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }
  
}
