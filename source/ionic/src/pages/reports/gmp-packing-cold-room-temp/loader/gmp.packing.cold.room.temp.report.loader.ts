import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'

import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp.packing.cold.room.temp.report.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-report-loader',
  templateUrl: './gmp.packing.cold.room.temp.report.loader.html'
})

export class GMPPackingColdRoomTempReportLoader extends SuperReportLoader implements OnInit, OnDestroy {
  @Input() report: Report = null
  @Input() activeReport: string = "any"
  @Language() lang: string
  showReport: boolean = false

  constructor(events: Events) {
    super(events)
  }
}