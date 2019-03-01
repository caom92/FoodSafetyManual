import { Component, Input, ViewChild } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'
import { ReportRequest } from '../../../../components/reports/reports.interface'

import { ActiveCAPA, CAPAReportInterface } from '../interface/capa-report.interface'
import { CAPAReport } from '../report/capa-report.component'

@Component({
  selector: '[capa-report-loader]',
  templateUrl: './capa-report-loader.component.html'
})

export class CAPAReportLoader {
  @Language() private lang: string
  @DefaultLocale() defaultLocale: string

  @Input() public report: CAPAReportInterface = null
  @Input() private activeCAPA: ActiveCAPA

  @ViewChild('reportContainer') public reportComponent: CAPAReport

  private showReport: boolean = false
  private reportRequest: ReportRequest = { lang: null, content: null, style: null, company: null, address: null, logo: null, orientation: null, footer: null, supervisor: null, signature: null, subject: null, fontsize: null, images: null }

  constructor() {

  }

  public requestPDFReport(): void {
    /*this.reportRequest = {
      lang: this.lang,
      content: JSON.stringify([this.reportComponent.getPDFContent()]),
      style: this.reportComponent.getCSS(),
      company: localStorage.getItem('company_name'),
      address: localStorage.getItem('company_address'),
      logo: localStorage.getItem('company_logo'),
      orientation: this.reportComponent.getOrientation(),
      supervisor: '',
      signature: '',
      subject: '',
      images: (this.reportComponent.getImages() == '') ? null : this.reportComponent.getImages(),
      fontsize: this.reportComponent.getFontSize()
    }*/
  }

  public openHTMLReport(): void {
    this.showReport = true
    this.activeCAPA.id = this.report.id
  }

  public closeHTMLReport(): void {
    this.showReport = false
    this.activeCAPA.id = 'any'
  }
}