import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportType } from '../interfaces/gmp.packing.preop.interface'

@Component({
  selector: '[gmp-packing-preop-report-type]',
  templateUrl: './gmp.packing.preop.type.html'
})

export class GMPPackingPreopReportTypeComponent {
  @Input() type: ReportType
  @Language() lang: string

  constructor() {

  }
}