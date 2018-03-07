import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportTest } from '../interfaces/gmp.packing.atp.testing.report.interface'

@Component({
  selector: '[gmp-packing-atp-testing-report-item]',
  templateUrl: './gmp.packing.atp.testing.test.html'
})

export class GMPPackingATPTestingReportItemComponent {
  @Input() item: ReportTest
  @Language() lang: string

  constructor() {

  }
}