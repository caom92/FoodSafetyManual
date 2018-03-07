import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportArea } from '../interfaces/gmp.self.inspection.pest.control.report.interface'

@Component({
  selector: '[gmp-self-inspection-pest-control-report-area]',
  templateUrl: './gmp.self.inspection.pest.control.area.html'
})

export class GMPSelfInspectionPestControlReportAreaComponent {
  @Input() area: ReportArea = { id: null, name: null, stations: [{ id: null, order: null, name: null, secured: null, condition: null, activity: null, corrective_actions: null }] }
  @Language() lang: string

  constructor() {

  }
}