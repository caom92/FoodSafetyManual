import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'

import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp.packing.scissors.knives.report.interface'

@Component({
  selector: 'gmp-packing-scissors-knives-report-loader',
  templateUrl: './gmp.packing.scissors.knives.report.loader.html'
})

export class GMPPackingScissorsKnivesReportLoader extends SuperReportLoader implements OnInit, OnDestroy {
  @Input() report: Report = null
  @Input() activeReport: string = "any"
  @Language() lang: string
  showReport: boolean = false

  constructor(events: Events) {
    super(events)
  }
}