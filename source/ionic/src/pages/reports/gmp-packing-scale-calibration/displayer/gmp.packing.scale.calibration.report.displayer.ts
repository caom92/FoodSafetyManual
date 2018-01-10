import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.scale.calibration.report.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-report-displayer',
  templateUrl: './gmp.packing.scale.calibration.report.displayer.html'
})

export class GMPPackingScaleCalibrationReportDisplayer {
  @Input() reports: Array<Report> = null
  @Input() activeReport: string = "any"
  @Language() lang: string

  constructor() {

  }
}