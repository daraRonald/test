import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderChartPage } from './orderchart';

@NgModule({
  declarations: [
    OrderChartPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderChartPage),
  ],
})
export class OrderChartPageModule {}
