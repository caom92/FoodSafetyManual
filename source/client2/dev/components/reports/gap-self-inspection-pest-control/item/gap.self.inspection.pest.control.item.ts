import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gap.self.inspection.pest.control.report.interface'

@Component({
  selector: '[gap-self-inspection-pest-control-report-item]',
  templateUrl: './gap.self.inspection.pest.control.item.html'
})

export class GAPSelfInspectionPestControlReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}