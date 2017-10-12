import { Component } from '@angular/core';
import { NavController, NavParams, Select, Events, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { Language } from 'angular-l10n';

import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../services/app.backend';
import { TranslationService } from '../../services/app.translation';
import { ToastService } from '../../services/app.toasts';

import { Report } from './gmp-packing-preop/gmp.packing.preop.interface'
import { GMPPackingPreopReportLoader } from './gmp-packing-preop/loader/gmp.packing.preop.report.loader'

@Component({
  selector: 'report',
  templateUrl: 'reports.html'
})
export class ReportTab {
  @Language() lang: string

  startDate: string = ""
  endDate: string = ""
  reports: Array<Report> = []
  activeReport: string = "any"

  dateRangeForm: FormGroup = this.formBuilder.group({
    startDate: [ this.startDate ],
    endDate: [ this.endDate ]
  })

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage, private sanitizer: DomSanitizer, private server: BackendService, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    events.subscribe("reportEvent", (activeReport, time) => {
      this.activeReport = activeReport
    })
  }

  getReportData(){
    let tempLoader = this.presentLoadingCustom()

    let dateRange = new FormData()
    dateRange.append('start_date', this.dateRangeForm.value.startDate)
    dateRange.append('end_date', this.dateRangeForm.value.endDate)

    console.log("Get Report Data")
    this.server.update(
      'report-' + 'gmp-packing-preop',//suffix,
      dateRange, 
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            console.log(response.data.reports)
            this.reports = response.data.reports
            this.activeReport = "any"
            tempLoader.dismiss()
            //this.logData.data = response.data
          }
        } else {
          //this.navCtrl.pop()
          tempLoader.dismiss()
        }
      },
      (error: any, caught: Observable<void>) => {
        //this.toastService.showText("serverUnreachable")
        tempLoader.dismiss()
        //this.navCtrl.pop()
        return []
      }
    )
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

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
    this.events.publish('language:changed', selectedValue, Date.now());
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}
