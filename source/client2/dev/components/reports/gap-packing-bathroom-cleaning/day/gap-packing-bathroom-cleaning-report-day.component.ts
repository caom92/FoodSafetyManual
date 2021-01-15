import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportDay } from '../interfaces/gap-packing-bathroom-cleaning-report.interface'

@Component({
  selector: '[gap-packing-bathroom-cleaning-report-day]',
  templateUrl: './gap-packing-bathroom-cleaning-report-day.component.html'
})

export class GAPPackingBathroomCleaningReportDayComponent {
  @Input() day: ReportDay
  @Language() lang: string

  constructor() {

  }
}