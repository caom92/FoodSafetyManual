import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.cold.room.temp.report.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-report-displayer',
  templateUrl: './gmp.packing.cold.room.temp.report.displayer.html'
})

export class GMPPackingColdRoomTempReportDisplayer {
  @Input() reports: Array<Report> = null
  @Input() activeReport: string = "any"
  @Language() lang: string

  constructor() {

  }
}