import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportArea } from '../interfaces/gap.packing.preop.report.interface'

@Component({
  selector: '[gap-packing-preop-report-area]',
  templateUrl: './gap.packing.preop.report.area.html'
})

export class GAPPackingPreopReportAreaComponent implements OnInit {
  @Input() area: ReportArea = { id: null, name: null, person_performing_sanitation: null, notes: null, time: null, types: [] }
  @Language() lang: string
  rowspan: number = 0

  constructor() {

  }

  ngOnInit() {
    this.calculateRowspan()
  }

  calculateRowspan() {
    this.rowspan = this.area.types.length
    for (let count of this.area.types) {
      this.rowspan += count.items.length
    }
  }
}