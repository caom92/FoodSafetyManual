import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { ReportRequest } from '../../../../components/reports/reports.interface'
import { ActiveCustomerComplaint, CustomerComplaintReportInterface } from '../interface/customer-complaint-report.interface'
import { CustomerComplaintReport } from '../report/customer-complaint-report.component'

@Component({
  selector: '[customer-complaint-report-loader]',
  templateUrl: './customer-complaint-report-loader.component.html'
})

export class CustomerComplaintReportLoader {
  @Language() private lang: string
  @DefaultLocale() defaultLocale: string

  @Input() public report: CustomerComplaintReportInterface = null
  @Input() private activeCustomerComplaint: ActiveCustomerComplaint

  @Output() removed = new EventEmitter<number>()

  @ViewChild('reportContainer') public reportComponent: CustomerComplaintReport

  private reportRequest: ReportRequest = { lang: null, content: null, style: null, company: null, address: null, logo: null, orientation: null, footer: null, supervisor: null, signature: null, subject: null, fontsize: null, images: null }

  constructor() {

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
    this.activeCustomerComplaint.id = this.report.id
  }

  public closeHTMLReport(): void {
    this.activeCustomerComplaint.id = 'any'
  }
}