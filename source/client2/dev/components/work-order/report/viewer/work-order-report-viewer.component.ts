import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { WorkOrderService } from '../../../../services/work-order.service'
import { DateTimeService } from '../../../../services/time.service'
import { WorkOrderReportInterface, ActiveWorkOrder } from '../interface/work-order-report.interface'

@Component({
  selector: 'work-order-report-viewer',
  templateUrl: './work-order-report-viewer.component.html'
})

export class WorkOrderReportViewer implements OnInit {
  @Language() lang: string
  dateOptions: Pickadate.DateOptions
  dateRangeForm: FormGroup
  reports: Array<WorkOrderReportInterface> = []
  activeWorkOrder: ActiveWorkOrder = { id: 'any' }

  constructor(private formBuilder: FormBuilder,
    private dateTimeService: DateTimeService,
    private workOrderService: WorkOrderService) {

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
      this.workOrderService.report(this.dateRangeForm.value).then(success => {
        this.reports = success
        this.activeWorkOrder.id = 'any'
      }, error => {

      })
    }
  }

  public onRemoved(id: number): void {
    let removeID = this.reports.findIndex((x => x.id == id))
    this.reports.splice(removeID, 1)
    this.activeWorkOrder.id = 'any'
  }
}