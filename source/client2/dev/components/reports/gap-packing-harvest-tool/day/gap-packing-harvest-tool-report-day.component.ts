import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportDay } from '../interfaces/gap-packing-harvest-tool-report.interface'

@Component({
  selector: '[gap-packing-harvest-tool-report-day]',
  templateUrl: './gap-packing-harvest-tool-report-day.component.html'
})

export class GAPPackingHarvestToolReportDayComponent {
  @Input() day: ReportDay
  @Language() lang: string

  constructor() {

  }
}