import { Component, ViewChild, OnInit } from '@angular/core'
import { NavController, NavParams, Select, Events, LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../../services/app.backend'
import { TranslationService } from '../../../services/app.translation'
import { ToastService } from '../../../services/app.toasts'

import { ManualTab } from '../../manual/manual'
import { ReportTab } from '../../reports/reports'

import { DateTimeService } from '../../../services/app.time'

import { GMPPackingPreopLogComponent } from './log/gmp.packing.preop.log'

@Component({
  selector: 'gmp-packing-preop-page',
  templateUrl: 'gmp.packing.preop.html',
  providers: [
    ToastService
  ]
})
export class GMPPackingPreopPage implements OnInit {
  @ViewChild('zone_select') zone_select: Select
  @ViewChild('language_select') language_select: Select
  @Language() lang: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage, private server: BackendService, public loadingCtrl: LoadingController, private toastService: ToastService) {
    console.log(this.manualSource)
  }

  logData: any = {}

  manualSource: any = {}
  
  tab1Root: any
  tab2Root: any
  tab3Root: any

  ngOnInit(){
    this.tab1Root = ManualTab
    this.tab2Root = ReportTab
    this.tab3Root = GMPPackingPreopLogComponent

    let tempLoader = this.presentLoadingCustom()
    this.server.update(
      'log-' + 'gmp-packing-preop',//suffix,
      new FormData, 
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.logData.data = response.data
            tempLoader.dismiss()
          }
        } else {
          tempLoader.dismiss()
          this.navCtrl.pop()
        }
      },
      (error: any, caught: Observable<void>) => {
        tempLoader.dismiss()
        this.toastService.showText("serverUnreachable")
        this.navCtrl.pop()
        return []
      }
    )

    this.storage.get("zone_name").then((zone_name) => {
      this.manualSource.manualSource = "gmp/packing/preop/" + zone_name.toLowerCase() + "/"
    })

    //this.manualSource.manualSource = "gmp/packing/preop/law/"
  }

  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div text-center>
          <img class="spinner" src="assets/images/koi_spinner.png" alt="" width="120" height="120">
        </div>
        <div text-center>Connecting to server...</div>`
    });

    loading.present();

    return loading
  }

  isEnglish(){
    return this.lang == "en"
  }

  isSpanish(){
    return this.lang == "es"
  }

  isDirector(){
    return localStorage["__mydb/_ionickv/role_name"] == '"Director"';
  }

  openZoneSelector() {
    this.zone_select.open();
  }

  openLanguageSelector() {
    this.language_select.open();
  }

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
    this.events.publish('language:changed', selectedValue, Date.now());
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}
