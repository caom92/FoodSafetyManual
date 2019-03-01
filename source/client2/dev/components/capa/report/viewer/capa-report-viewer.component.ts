import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { CAPAService } from '../../../../services/capa.service'
import { DateTimeService } from '../../../../services/time.service'
import { CAPAReportInterface, ActiveCAPA } from '../interface/capa-report.interface'

@Component({
  selector: 'capa-report-viewer',
  templateUrl: './capa-report-viewer.component.html'
})

export class CAPAReportViewer implements OnInit {
  @Language() lang: string
  dateOptions: Pickadate.DateOptions
  dateRangeForm: FormGroup
  reports: Array<CAPAReportInterface> = []
  activeCAPA: ActiveCAPA = { id: 'any' }

  constructor(private formBuilder: FormBuilder,
    private dateTimeService: DateTimeService,
    private capaService: CAPAService) {

  }

  public ngOnInit(): void {
    this.dateOptions = getDatePickerConfig(localStorage.getItem('lang'))

    this.initRequestForm()
  }

  public initRequestForm(): void {
    let startDate: string = this.dateTimeService.getISODate()
    let endDate: string = this.dateTimeService.getISODate()

    this.dateRangeForm = this.formBuilder.group({
      start_date: [startDate, [Validators.required]],
      end_date: [endDate, [Validators.required]]
    })
  }

  public requestReports(): void {
    if (this.dateRangeForm.valid) {
      this.capaService.report(this.dateRangeForm.value).then(success => {
        console.log(success)
        this.reports = success
        this.activeCAPA.id = 'any'
        console.log(this.reports)
        console.log(this.activeCAPA)
      }, error => {

      }) 
    }
  }
}