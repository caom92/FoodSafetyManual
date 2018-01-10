import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { ReportArea } from '../interfaces/gmp.packing.glass.brittle.report.interface'

@Component({
  selector: '[gmp-packing-glass-brittle-report-area]',
  templateUrl: './gmp.packing.glass.brittle.area.html'
})

export class GMPPackingGlassBrittleReportAreaComponent implements OnInit {
  @Input() area: ReportArea = { id: null, name: null, items: [] }
  @Language() lang: string
  rowspan: number = 0
  @Input() time: string = ""

  constructor() {

  }

  ngOnInit() {
    this.calculateRowspan()
  }

  calculateRowspan() {
    this.rowspan = this.area.items.length
    this.rowspan = this.rowspan + 1
  }
}