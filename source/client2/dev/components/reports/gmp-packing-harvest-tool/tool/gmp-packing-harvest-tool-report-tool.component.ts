import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportTool } from '../interfaces/gmp-packing-harvest-tool-report.interface'

@Component({
  selector: '[gmp-packing-harvest-tool-report-tool]',
  templateUrl: './gmp-packing-harvest-tool-report-tool.component.html'
})

export class GMPPackingHarvestToolReportToolComponent {
  @Input() tool: ReportTool
  @Language() lang: string

  constructor() {

  }
}