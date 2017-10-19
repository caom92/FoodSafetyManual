import { Component, ComponentFactoryResolver } from '@angular/core';
import { NavController, NavParams, Select, Events, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { Language, TranslationService as TService } from 'angular-l10n';

import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../services/app.backend';
import { TranslationService } from '../../services/app.translation';
import { ToastService } from '../../services/app.toasts';

import { DynamicComponentResolver } from '../../app/dynamic.resolver'

import { Report } from './gmp-packing-preop/gmp.packing.preop.interface'
import { GMPPackingPreopReportDisplayer } from './gmp-packing-preop/displayer/gmp.packing.preop.report.displayer'
import { GMPPackingHandWashingReportDisplayer } from './gmp-packing-hand-washing/displayer/gmp.packing.hand.washing.report.displayer'
import { GMPPackingGlassBrittleReportDisplayer } from './gmp-packing-glass-brittle/displayer/gmp.packing.glass.brittle.report.displayer'
import { GMPPackingScaleCalibrationReportDisplayer } from './gmp-packing-scale-calibration/displayer/gmp.packing.scale.calibration.report.displayer'

@Component({
  selector: 'report',
  templateUrl: 'reports.html'
})
export class ReportTab extends DynamicComponentResolver {
  @Language() lang: string

  // Componente lanzador de reporte
  loaderComponent: any = null

  startDate: string = ""
  endDate: string = ""
  reportSuffix: string = ""
  reports: Array<Report> = []
  activeReport: string = "any"

  dateRangeForm: FormGroup = this.formBuilder.group({
    startDate: [ this.startDate ],
    endDate: [ this.endDate ]
  })

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage, private sanitizer: DomSanitizer, private server: BackendService, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, factoryResolver: ComponentFactoryResolver, public ts: TService) {
    super(factoryResolver)
    events.subscribe("reportEvent", (activeReport, time) => {
      this.activeReport = activeReport
      console.log("reporte activo: " + activeReport)
    })
    this.reportSuffix = this.navParams.get('log_suffix')
  }

  getReportData(){
    let tempLoader = this.presentLoadingCustom()

    let dateRange = new FormData()
    dateRange.append('start_date', this.dateRangeForm.value.startDate)
    dateRange.append('end_date', this.dateRangeForm.value.endDate)

    console.log("Get Report Data")
    this.server.update(
      'report-' + this.reportSuffix,//suffix,
      dateRange, 
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            console.log(response.data.reports)
            this.reports = response.data.reports
            this.activeReport = "any"
            tempLoader.dismiss()
            switch(this.reportSuffix){
              case 'gmp-packing-preop': this.loaderComponent = this.loadComponent(GMPPackingPreopReportDisplayer, {
                parent: this,
                reports: this.reports,
                activeReport: this.activeReport
              }).instance
                break
              case 'gmp-packing-hand-washing': this.loaderComponent = this.loadComponent(GMPPackingHandWashingReportDisplayer, {
                parent: this,
                reports: this.reports,
                activeReport: this.activeReport
              }).instance
                break
              case 'gmp-packing-glass-brittle': this.loaderComponent = this.loadComponent(GMPPackingGlassBrittleReportDisplayer, {
                parent: this,
                reports: this.reports,
                activeReport: this.activeReport
              }).instance
                break
              case 'gmp-packing-scale-calibration': this.loaderComponent = this.loadComponent(GMPPackingScaleCalibrationReportDisplayer, {
                parent: this,
                reports: this.reports,
                activeReport: this.activeReport
              }).instance
                break
              default: this.loaderComponent = this.loadComponent(GMPPackingPreopReportDisplayer, {
                parent: this,
                reports: this.reports,
                activeReport: this.activeReport
              }).instance
            }
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
          <img class="spinner" src="assets/images/koi_spinner.png" alt="" width="240" height="240">
        </div>
        <div text-center>` + this.ts.translate("Connecting to Server") + `</div>`
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
