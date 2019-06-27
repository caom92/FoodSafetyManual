import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportType } from '../interfaces/gmp-packing-harvest-tool-report.interface'

@Component({
  selector: '[gmp-packing-harvest-tool-report-type]',
  templateUrl: './gmp-packing-harvest-tool-report-type.component.html'
})

export class GMPPackingHarvestToolReportTypeComponent {
  @Input() type: ReportType
  @Language() lang: string

  constructor() {

  }
}