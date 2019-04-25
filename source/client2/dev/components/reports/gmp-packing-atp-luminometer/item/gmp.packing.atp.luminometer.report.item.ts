import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.packing.atp.luminometer.report.interface'

@Component({
  selector: '[gmp-packing-atp-luminometer-report-item]',
  templateUrl: './gmp.packing.atp.luminometer.report.item.html'
})

export class GMPPackingATPLuminometerReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}