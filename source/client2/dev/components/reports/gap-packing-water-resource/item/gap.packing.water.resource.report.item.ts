import { Component, Input } from '@angular/core'
import { Language, DefaultLocale } from 'angular-l10n'

import { ReportItem } from '../interfaces/gap.packing.water.resource.report.interface'

@Component({
  selector: '[gap-packing-water-resource-report-item]',
  templateUrl: './gap.packing.water.resource.report.item.html'
})

export class GAPPackingWaterResourceReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string
  @DefaultLocale() defaultLocale: string

  readonly dayOptions = { day: 'numeric' }
  readonly monthOptions = { month: 'short' }
  readonly yearOptions = { year: '2-digit' }

  constructor() {

  }
}