import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { ReportItem } from '../interfaces/gap.packing.preop.report.interface'

@Component({
  selector: '[gap-packing-preop-report-item]',
  templateUrl: './gap.packing.preop.report.item.html'
})

export class GAPPackingPreopReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}