import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { ReportItem } from '../interfaces/gmp.packing.preop.interface'

@Component({
  selector: '[gmp-packing-preop-report-item]',
  templateUrl: './gmp.packing.preop.item.html'
})

export class GMPPackingPreopReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}