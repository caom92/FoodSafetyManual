import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gap-packing-bathroom-cleaning-report.interface'

@Component({
  selector: '[gap-packing-bathroom-cleaning-report-item]',
  templateUrl: './gap-packing-bathroom-cleaning-report-item.component.html'
})

export class GAPPackingBathroomCleaningReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}