import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { ReportType } from '../interfaces/gmp.packing.scale.calibration.report.interface'

@Component({
  selector: '[gmp-packing-scale-calibration-report-type]',
  templateUrl: './gmp.packing.scale.calibration.report.type.html'
})

export class GMPPackingScaleCalibrationReportTypeComponent implements OnInit {
  @Input() type: ReportType
  @Input() visible: boolean
  @Language() lang: string
  rowspan: number = 0

  constructor() {

  }

  ngOnInit() {
    this.calculateRowspan()
  }

  calculateRowspan() {
    this.rowspan = this.type.items.length
    this.rowspan = this.rowspan + 1
  }
}