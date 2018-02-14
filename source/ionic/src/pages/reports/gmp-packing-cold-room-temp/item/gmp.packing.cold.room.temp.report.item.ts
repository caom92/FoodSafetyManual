import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.packing.cold.room.temp.report.interface'

@Component({
  selector: '[gmp-packing-cold-room-temp-report-item]',
  templateUrl: './gmp.packing.cold.room.temp.report.item.html'
})

export class GMPPackingColdRoomTempReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string
  @Input() time: string = null
  @Input() timeRowspan: number = null

  constructor() {

  }
}