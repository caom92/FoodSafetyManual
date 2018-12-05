import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportArea } from '../interfaces/gap.packing.water.resource.report.interface'

@Component({
  selector: '[gap-packing-water-resource-report-area]',
  templateUrl: './gap.packing.water.resource.report.area.html'
})

export class GAPPackingWaterResourceReportAreaComponent {
  @Input() area: ReportArea = { id: null, name: null, items: [{ id: null, name: null, date: null, compliance: null, corrective_actions: null }] }
  @Language() lang: string

  constructor() {

  }
}