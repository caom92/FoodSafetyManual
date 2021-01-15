import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportDay } from '../interfaces/gmp-packing-bathroom-cleaning-report.interface'

@Component({
  selector: '[gmp-packing-bathroom-cleaning-report-day]',
  templateUrl: './gmp-packing-bathroom-cleaning-report-day.component.html'
})

export class GMPPackingBathroomCleaningReportDayComponent {
  @Input() day: ReportDay
  @Language() lang: string

  constructor() {

  }
}