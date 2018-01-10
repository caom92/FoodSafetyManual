import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.preop.interface'

@Component({
  selector: 'gmp-packing-preop-report-displayer',
  templateUrl: './gmp.packing.preop.report.displayer.html'
})

export class GMPPackingPreopReportDisplayer {
  @Input() reports: Array<Report> = null
  @Input() activeReport: string = "any"
  @Language() lang: string

  constructor() {

  }
}