import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.atp.testing.report.interface'

@Component({
  selector: 'gmp-packing-atp-testing-report',
  templateUrl: './gmp.packing.atp.testing.report.html'
})

export class GMPPackingATPTestingReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
  }

  public getCSS(): string {
    return ""
  }
}