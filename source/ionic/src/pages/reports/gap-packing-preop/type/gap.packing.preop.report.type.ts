import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { ReportType } from '../interfaces/gap.packing.preop.report.interface'

@Component({
  selector: '[gap-packing-preop-report-type]',
  templateUrl: './gap.packing.preop.report.type.html'
})

export class GAPPackingPreopReportTypeComponent {
  @Input() type: ReportType
  @Input() visible: boolean
  @Language() lang: string

  constructor() {

  }
}