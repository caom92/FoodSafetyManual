import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.glass.brittle.report.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-report',
  templateUrl: './gmp.packing.glass.brittle.report.html'
})

export class GMPPackingGlassBrittleReportComponent {
  @Input() report: Report
  @Language() lang: string

  constructor() {

  }
}