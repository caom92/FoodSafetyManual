import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp-packing-bathroom-cleaning-report.interface'

@Component({
  selector: '[gmp-packing-bathroom-cleaning-report-item]',
  templateUrl: './gmp-packing-bathroom-cleaning-report-item.component.html'
})

export class GMPPackingBathroomCleaningReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}