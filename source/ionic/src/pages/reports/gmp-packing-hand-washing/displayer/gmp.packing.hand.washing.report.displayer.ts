import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.hand.washing.report.interface'

@Component({
  selector: 'gmp-packing-hand-washing-report-displayer',
  templateUrl: './gmp.packing.hand.washing.report.displayer.html'
})

export class GMPPackingHandWashingReportDisplayer {
  @Input() reports: Array<Report> = null
  @Input() activeReport: string = "any"
  @Language() lang: string

  constructor() {

  }
}