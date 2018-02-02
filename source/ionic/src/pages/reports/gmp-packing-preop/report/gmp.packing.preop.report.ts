import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.preop.interface'
import { SuperReport } from '../../super-report/super.report'

@Component({
  selector: 'gmp-packing-preop-report',
  templateUrl: './gmp.packing.preop.report.html'
})

export class GMPPackingPreopReportComponent implements SuperReport {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") rep: any

  constructor() {

  }

  getCSS() {
    return ""
  }

  getPDFReportHeader() {
    return ""
  }

  getPDFReportBody() {
    return this.rep.nativeElement.outerHTML
  }
}