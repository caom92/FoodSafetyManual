import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { ReportRequest } from '../../../../components/reports/reports.interface'
import { WorkOrderService } from '../../../../services/work-order.service'
import { ActiveWorkOrder, WorkOrderReportInterface } from '../interface/work-order-report.interface'
import { WorkOrderReport } from '../report/work-order-report.component'

@Component({
  selector: '[work-order-report-loader]',
  templateUrl: './work-order-report-loader.component.html'
})

export class WorkOrderReportLoader {
  @Language() private lang: string
  @DefaultLocale() defaultLocale: string

  @Input() public report: WorkOrderReportInterface = null
  @Input() private activeWorkOrder: ActiveWorkOrder

  @Output() removed = new EventEmitter<number>()

  @ViewChild('reportContainer') public reportComponent: WorkOrderReport

  private reportRequest: ReportRequest = { lang: null, content: null, style: null, company: null, address: null, logo: null, orientation: null, footer: null, supervisor: null, signature: null, subject: null, fontsize: null, images: null }

  constructor(private workOrderService: WorkOrderService) {

  }

  public requestPDFReport(): void {
    this.reportRequest = {
      lang: this.lang,
      content: JSON.stringify([this.reportComponent.getPDFContent()]),
      style: this.reportComponent.getCSS(),
      company: localStorage.getItem('company_name'),
      address: localStorage.getItem('company_address'),
      logo: localStorage.getItem('company_logo'),
      orientation: this.reportComponent.getOrientation(),
      footer: '',
      supervisor: '',
      signature: '',
      subject: '',
      images: (this.reportComponent.getImages() == '') ? null : this.reportComponent.getImages(),
      fontsize: this.reportComponent.getFontSize()
    }
  }

  public openHTMLReport(): void {
    this.activeWorkOrder.id = this.report.id
  }

  public closeHTMLReport(): void {
    this.activeWorkOrder.id = 'any'
  }

  public delete(): void {
    this.workOrderService.delete(this.report.id).then(success => {
      this.removed.emit(this.report.id)
    }, error => {

    })
  }
}