import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.hand.washing.report.interface'

@Component({
  selector: 'gmp-packing-hand-washing-report',
  templateUrl: './gmp.packing.hand.washing.report.html'
})

export class GMPPackingHandWashingReportComponent {
  @Input() report: Report
  @Language() lang: string

  constructor() {

  }
}