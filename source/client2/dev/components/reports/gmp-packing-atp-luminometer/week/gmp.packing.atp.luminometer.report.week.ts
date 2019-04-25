import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportWeek } from '../interfaces/gmp.packing.atp.luminometer.report.interface'

@Component({
  selector: '[gmp-packing-atp-luminometer-report-week]',
  templateUrl: './gmp.packing.atp.luminometer.report.week.html'
})

export class GMPPackingATPLuminometerReportWeekComponent {
  @Input() week: ReportWeek
  @Language() lang: string

  constructor() {

  }
}