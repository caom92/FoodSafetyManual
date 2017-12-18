import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.scale.calibration.report.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-report',
  templateUrl: './gmp.packing.scale.calibration.report.html'
})

export class GMPPackingScaleCalibrationReportComponent {
  @Input() report: Report
  @Language() lang: string

  constructor() {

  }
}