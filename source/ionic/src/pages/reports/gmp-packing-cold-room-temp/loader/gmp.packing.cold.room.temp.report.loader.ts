import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.cold.room.temp.report.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'

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