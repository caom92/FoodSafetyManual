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

// GMP Packing Preop

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
import { GMPPackingPreopReportDisplayer } from '../pages/reports/gmp-packing-preop/displayer/gmp.packing.preop.report.displayer'

// GMP Packing Hand Washing

import { GMPPackingHandWashingLogComponent } from '../pages/logs/gmp-packing-hand-washing/log/gmp.packing.hand.washing.log'
import { GMPPackingHandWashingItemComponent } from '../pages/logs/gmp-packing-hand-washing/item/gmp.packing.hand.washing.item'

import { GMPPackingHandWashingReportComponent } from '../pages/reports/gmp-packing-hand-washing/report/gmp.packing.hand.washing.report'
import { GMPPackingHandWashingReportItemComponent } from '../pages/reports/gmp-packing-hand-washing/item/gmp.packing.hand.washing.item'
import { GMPPackingHandWashingReportLoader } from '../pages/reports/gmp-packing-hand-washing/loader/gmp.packing.hand.washing.report.loader'
import { GMPPackingHandWashingReportDisplayer } from '../pages/reports/gmp-packing-hand-washing/displayer/gmp.packing.hand.washing.report.displayer'

// GMP Packing Glass Brittle

import { GMPPackingGlassBrittleLogComponent } from '../pages/logs/gmp-packing-glass-brittle/log/gmp.packing.glass.brittle.log'
import { GMPPackingGlassBrittleAreaComponent } from '../pages/logs/gmp-packing-glass-brittle/area/gmp.packing.glass.brittle.area'
import { GMPPackingGlassBrittleItemComponent } from '../pages/logs/gmp-packing-glass-brittle/item/gmp.packing.glass.brittle.item'

import { GMPPackingGlassBrittleReportComponent } from '../pages/reports/gmp-packing-glass-brittle/report/gmp.packing.glass.brittle.report'
import { GMPPackingGlassBrittleReportAreaComponent } from '../pages/reports/gmp-packing-glass-brittle/area/gmp.packing.glass.brittle.area'
import { GMPPackingGlassBrittleReportItemComponent } from '../pages/reports/gmp-packing-glass-brittle/item/gmp.packing.glass.brittle.item'
import { GMPPackingGlassBrittleReportLoader } from '../pages/reports/gmp-packing-glass-brittle/loader/gmp.packing.glass.brittle.report.loader'
import { GMPPackingGlassBrittleReportDisplayer } from '../pages/reports/gmp-packing-glass-brittle/displayer/gmp.packing.glass.brittle.report.displayer'

// Tabs

import { ManualTab } from '../pages/manual/manual'
import { ReportTab } from '../pages/reports/reports'

import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';

import { DynamicComponentContainerDirective } from '../directives/dynamic.container'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditProfile,
    ModulesPage,
    LogsPage,
    ManualTab,
    ReportTab,
    DynamicComponentContainerDirective,
    GMPPackingPreopPage,
    GMPPackingPreopLogComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopItemComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent,
    GMPPackingPreopReportLoader,
    GMPPackingPreopReportDisplayer,
    GMPPackingHandWashingLogComponent,
    GMPPackingHandWashingItemComponent,
    GMPPackingHandWashingReportComponent,
    GMPPackingHandWashingReportItemComponent,
    GMPPackingHandWashingReportLoader,
    GMPPackingHandWashingReportDisplayer,
    GMPPackingGlassBrittleLogComponent,
    GMPPackingGlassBrittleAreaComponent,
    GMPPackingGlassBrittleItemComponent,
    GMPPackingGlassBrittleReportComponent,
    GMPPackingGlassBrittleReportAreaComponent,
    GMPPackingGlassBrittleReportItemComponent,
    GMPPackingGlassBrittleReportLoader,
    GMPPackingGlassBrittleReportDisplayer
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
    GMPPackingPreopReportLoader,
    GMPPackingPreopReportDisplayer,
    GMPPackingHandWashingLogComponent,
    GMPPackingHandWashingItemComponent,
    GMPPackingHandWashingReportComponent,
    GMPPackingHandWashingReportItemComponent,
    GMPPackingHandWashingReportLoader,
    GMPPackingHandWashingReportDisplayer,
    GMPPackingGlassBrittleLogComponent,
    GMPPackingGlassBrittleAreaComponent,
    GMPPackingGlassBrittleItemComponent,
    GMPPackingGlassBrittleReportComponent,
    GMPPackingGlassBrittleReportAreaComponent,
    GMPPackingGlassBrittleReportItemComponent,
    GMPPackingGlassBrittleReportLoader,
    GMPPackingGlassBrittleReportDisplayer
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
