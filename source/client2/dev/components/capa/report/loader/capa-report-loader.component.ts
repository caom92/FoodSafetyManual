import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { ReportRequest } from '../../../../components/reports/reports.interface'
import { CAPAService } from '../../../../services/capa.service'
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

  @Output() removed = new EventEmitter<number>()

  @ViewChild('reportContainer') public reportComponent: CAPAReport

  private reportRequest: ReportRequest = { lang: null, content: null, style: null, company: null, address: null, logo: null, orientation: null, footer: null, supervisor: null, signature: null, subject: null, fontsize: null, images: null }

  constructor(private capaService: CAPAService) {

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
    this.activeCAPA.id = this.report.id
  }

  public closeHTMLReport(): void {
    this.activeCAPA.id = 'any'
  }

  public delete(): void {
    this.capaService.delete(this.report.id).then(success => {
      this.removed.emit(this.report.id)
    }, error => {

    })
  }
}