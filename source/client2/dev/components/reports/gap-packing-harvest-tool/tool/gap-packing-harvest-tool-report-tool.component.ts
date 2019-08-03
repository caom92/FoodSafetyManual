import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportTool } from '../interfaces/gap-packing-harvest-tool-report.interface'

@Component({
  selector: '[gap-packing-harvest-tool-report-tool]',
  templateUrl: './gap-packing-harvest-tool-report-tool.component.html'
})

export class GAPPackingHarvestToolReportToolComponent {
  @Input() tool: ReportTool
  @Language() lang: string

  constructor() {

  }
}