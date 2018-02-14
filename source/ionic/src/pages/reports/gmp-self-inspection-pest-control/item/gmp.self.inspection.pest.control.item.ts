import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.self.inspection.pest.control.report.interface'

@Component({
  selector: '[gmp-self-inspection-pest-control-report-item]',
  templateUrl: './gmp.self.inspection.pest.control.item.html'
})

export class GMPSelfInspectionPestControlReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}