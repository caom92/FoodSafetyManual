import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportDay } from '../interfaces/gmp-packing-harvest-tool-report.interface'

@Component({
  selector: '[gmp-packing-harvest-tool-report-day]',
  templateUrl: './gmp-packing-harvest-tool-report-day.component.html'
})

export class GMPPackingHarvestToolReportDayComponent {
  @Input() day: ReportDay
  @Language() lang: string

  constructor() {

  }
}