import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { CustomerComplaintService } from '../../../../services/customer-complaint.service'
import { DateTimeService } from '../../../../services/time.service'
import { ActiveCustomerComplaint, CustomerComplaintReportInterface } from '../interface/customer-complaint-report.interface'

@Component({
  selector: 'customer-complaint-report-viewer',
  templateUrl: './customer-complaint-report-viewer.component.html'
})

export class CustomerComplaintReportViewer implements OnInit {
  @Language() lang: string
  dateOptions: Pickadate.DateOptions
  dateRangeForm: FormGroup
  reports: Array<CustomerComplaintReportInterface> = []
  activeCustomerComplaint: ActiveCustomerComplaint = { id: 'any' }

  constructor(private formBuilder: FormBuilder,
    private dateTimeService: DateTimeService,
    private customerComplaintService: CustomerComplaintService) {

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
      this.customerComplaintService.report(this.dateRangeForm.value).then(success => {
        this.reports = success
        this.activeCustomerComplaint.id = 'any'
      }, error => {

      })
    }
  }
}