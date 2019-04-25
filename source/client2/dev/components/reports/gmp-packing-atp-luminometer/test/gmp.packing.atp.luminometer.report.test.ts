import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportTest } from '../interfaces/gmp.packing.atp.luminometer.report.interface'

@Component({
  selector: '[gmp-packing-atp-luminometer-report-test]',
  templateUrl: './gmp.packing.atp.luminometer.report.test.html'
})

export class GMPPackingATPLuminometerReportTestComponent {
  @Input() test: ReportTest
  @Language() lang: string

  constructor() {

  }
}