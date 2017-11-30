import { Component, ComponentFactoryResolver } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Observable } from 'rxjs/Rx'
import { DynamicComponentResolver } from './dynamic.resolver'

import { BackendService } from '../services/app.backend'
import { LanguageService } from '../services/app.language'

import { ReportDisplayer } from './app.report.displayer.component'

@Component({
    selector: 'report',
    templateUrl: '../templates/app.reports.html'
  })
export class ReportTab extends DynamicComponentResolver {
    loaderComponent: any = null
  
    startDate: string = ""
    endDate: string = ""
    reportSuffix: string = "gmp-packing-preop"
    reports: Array<any> = []
    activeReport: string = "any"
  
    dateRangeForm: FormGroup = this.formBuilder.group({
      startDate: [ this.startDate ],
      endDate: [ this.endDate ]
    })
  
    constructor(private server: BackendService, private formBuilder: FormBuilder, factoryResolver: ComponentFactoryResolver, private langManager: LanguageService) {
      super(factoryResolver)
    }
  
    getReportData(){
      this.reports = []
      let dateRange = new FormData()
      dateRange.append('start_date', this.dateRangeForm.value.startDate)
      dateRange.append('end_date', this.dateRangeForm.value.endDate)
  
      console.log("Get Report Data")
      console.log(this.reportSuffix)
      this.server.update(
        'report-' + this.reportSuffix,//suffix,
        dateRange, 
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              console.log(response.data.reports)
              this.reports = response.data.reports
              this.activeReport = "any"
              switch(this.reportSuffix){
                case 'gmp-packing-preop': 
                console.log("case " + this.reportSuffix)
                console.log(ReportDisplayer)
                this.loaderComponent = this.loadComponent(ReportDisplayer, {
                  parent: this,
                  reports: this.reports,
                  activeReport: this.activeReport
                }).instance
                  break
                /*case 'gmp-packing-hand-washing': this.loaderComponent = this.loadComponent(GMPPackingHandWashingReportDisplayer, {
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
                case 'gmp-packing-preop': this.loaderComponent = this.loadComponent(GAPPackingPreopReportDisplayer, {
                  parent: this,
                  reports: this.reports,
                  activeReport: this.activeReport
                }).instance
                  break*/
                default: this.loaderComponent = this.loadComponent(ReportDisplayer, {
                  parent: this,
                  reports: this.reports,
                  activeReport: this.activeReport
                }).instance
              }//*/
              //this.logData.data = response.data
            }
          } else {
            //this.navCtrl.pop()
          }
        },
        (error: any, caught: Observable<void>) => {
          //this.toastService.showText("serverUnreachable")
          //this.navCtrl.pop()
          return []
        }
      )
    }
}
  