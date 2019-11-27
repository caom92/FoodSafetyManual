import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportArea } from '../interfaces/gap.self.inspection.pest.control.report.interface'

@Component({
  selector: '[gap-self-inspection-pest-control-report-area]',
  templateUrl: './gap.self.inspection.pest.control.area.html'
})

export class GAPSelfInspectionPestControlReportAreaComponent {
  @Input() area: ReportArea = { id: null, name: null, stations: [{ id: null, order: null, name: null, secured: null, condition: null, activity: null, corrective_actions: null }] }
  @Language() lang: string

  constructor() {

  }
}