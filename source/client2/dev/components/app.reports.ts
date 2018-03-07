import { Component, ComponentFactoryResolver } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Observable } from 'rxjs/Rx'
import { DynamicComponentResolver } from './dynamic.resolver'

import { BackendService } from '../services/app.backend'
import { LanguageService } from '../services/app.language'

import { ReportDisplayer } from './app.report.displayer.component'

@Component({
  selector: 'report-old',
  templateUrl: '../templates/app.reports.html'
})
export class ReportTabOld {
  loaderComponent: any = null

  startDate: string = ""
  endDate: string = ""
  reportSuffix: string = "gmp-packing-preop"
  reports: Array<any> = []
  activeReport: string = "any"

  dateRangeForm: FormGroup = this.formBuilder.group({
    startDate: [this.startDate],
    endDate: [this.endDate]
  })

  constructor(private server: BackendService, private formBuilder: FormBuilder, private langManager: LanguageService) {

  }

  getReportData() {
    this.reports = []
    let dateRange = new FormData()
    dateRange.append('start_date', this.dateRangeForm.value.startDate)
    dateRange.append('end_date', this.dateRangeForm.value.endDate)

    this.server.update(
      'report-' + this.reportSuffix,//suffix,
      dateRange,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.reports = response.data.reports
            this.activeReport = "any"
          } else {
          }
        }
      },
      (error: any, caught: Observable<void>) => {
        //this.toastService.showText("serverUnreachable")
        return []
      }
    )
  }
}
