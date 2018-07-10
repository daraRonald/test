import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ImageProvider } from '../providers/image/image';
import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth';
import { WordpressProvider } from '../providers/wordpress/wordpress';
import { WooProvider} from '../providers/woocommerce/woocommerce';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    WordpressProvider,
    WooProvider,
    Push,
    ImagePicker,
	Base64,
	ImageProvider,
	Camera
  ]
})
export class AppModule {}
