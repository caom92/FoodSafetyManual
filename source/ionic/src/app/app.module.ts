import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EditProfile } from '../pages/edit-profile/edit-profile';

import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditProfile
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    TranslationModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['localstorage', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditProfile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(public locale: LocaleService, public translation: TranslationService) {
    this.locale.addConfiguration()
        .addLanguages(['en', 'es'])
        .setCookieExpiration(30)
        .defineLanguage('es');

    this.translation.addConfiguration()
        .addProvider('./assets/locale-');

    this.translation.init();
  }
}
