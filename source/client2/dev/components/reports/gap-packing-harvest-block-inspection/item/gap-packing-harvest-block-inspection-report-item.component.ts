import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gap-packing-harvest-block-inspection-report.interface'

@Component({
  selector: '[gap-packing-harvest-block-inspection-report-item]',
  templateUrl: './gap-packing-harvest-block-inspection-report-item.component.html'
})

export class GAPPackingHarvestBlockInspectionReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}