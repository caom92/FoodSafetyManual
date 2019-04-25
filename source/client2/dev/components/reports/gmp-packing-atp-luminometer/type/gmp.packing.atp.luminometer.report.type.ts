import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportType } from '../interfaces/gmp.packing.atp.luminometer.report.interface'

@Component({
  selector: '[gmp-packing-atp-luminometer-report-type]',
  templateUrl: './gmp.packing.atp.luminometer.report.type.html'
})

export class GMPPackingATPLuminometerReportTypeComponent {
  @Input() type: ReportType
  @Language() lang: string

  constructor() {

  }
}