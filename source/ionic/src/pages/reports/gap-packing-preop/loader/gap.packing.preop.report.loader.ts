import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gap.packing.preop.report.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-preop-report-loader',
  templateUrl: './gap.packing.preop.report.loader.html'
})

export class GAPPackingPreopReportLoader extends SuperReportLoader implements OnInit, OnDestroy {
  @Input() report: Report = null
  @Input() activeReport: string = "any"
  @Language() lang: string
  showReport: boolean = false

  constructor(events: Events) {
    super(events)
  }
}