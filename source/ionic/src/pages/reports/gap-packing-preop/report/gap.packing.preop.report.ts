import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gap.packing.preop.report.interface'

@Component({
  selector: 'gap-packing-preop-report',
  templateUrl: './gap.packing.preop.report.html'
})

export class GAPPackingPreopReportComponent {
  @Input() report: Report
  @Language() lang: string

  constructor() {

  }
}