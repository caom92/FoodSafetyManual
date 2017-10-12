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
import { ModulesPage } from '../pages/modules/modules';
import { LogsPage } from '../pages/logs/logs';

import { GMPPackingPreopPage } from '../pages/logs/gmp-packing-preop/gmp.packing.preop'
import { GMPPackingPreopLogComponent } from '../pages/logs/gmp-packing-preop/log/gmp.packing.preop.log'
import { GMPPackingPreopAreaComponent } from '../pages/logs/gmp-packing-preop/area/gmp.packing.preop.area'
import { GMPPackingPreopTypeComponent } from '../pages/logs/gmp-packing-preop/type/gmp.packing.preop.type'
import { GMPPackingPreopItemComponent } from '../pages/logs/gmp-packing-preop/item/gmp.packing.preop.item'

import { GMPPackingPreopReportComponent } from '../pages/reports/gmp-packing-preop/report/gmp.packing.preop.report'
import { GMPPackingPreopReportAreaComponent } from '../pages/reports/gmp-packing-preop/area/gmp.packing.preop.area'
import { GMPPackingPreopReportTypeComponent } from '../pages/reports/gmp-packing-preop/type/gmp.packing.preop.type'
import { GMPPackingPreopReportItemComponent } from '../pages/reports/gmp-packing-preop/item/gmp.packing.preop.item'
import { GMPPackingPreopReportLoader } from '../pages/reports/gmp-packing-preop/loader/gmp.packing.preop.report.loader'

import { ManualTab } from '../pages/manual/manual'
import { ReportTab } from '../pages/reports/reports'

import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditProfile,
    ModulesPage,
    LogsPage,
    ManualTab,
    ReportTab,
    GMPPackingPreopPage,
    GMPPackingPreopLogComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopItemComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent,
    GMPPackingPreopReportLoader
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
    EditProfile,
    ModulesPage,
    LogsPage,
    ManualTab,
    ReportTab,
    GMPPackingPreopPage,
    GMPPackingPreopLogComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopItemComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent,
    GMPPackingPreopReportLoader
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
