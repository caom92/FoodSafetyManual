import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportEntry, ReportTest } from '../interfaces/gmp.packing.atp.testing.report.interface'

@Component({
  selector: '[gmp-packing-atp-testing-report-area]',
  templateUrl: './gmp.packing.atp.testing.entry.html'
})

export class GMPPackingATPTestingReportAreaComponent implements OnInit {
  @Input() area: ReportEntry = { name: null, time: null, items: [] }
  @Language() lang: string
  @Input() item: ReportTest
  rowspan: number = 0

  constructor() {

  }

  ngOnInit() {
    this.calculateRowspan()
  }

  calculateRowspan() {
    this.rowspan = this.area.items.length
  }
}