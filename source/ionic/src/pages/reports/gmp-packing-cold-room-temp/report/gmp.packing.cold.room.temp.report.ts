import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.cold.room.temp.report.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-report',
  templateUrl: './gmp.packing.cold.room.temp.report.html'
})

export class GMPPackingColdRoomTempReportComponent {
  @Input() report: Report
  @Language() lang: string

  constructor() {

  }
}