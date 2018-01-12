import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.packing.scale.calibration.report.interface'

@Component({
  selector: '[gmp-packing-scale-calibration-report-item]',
  templateUrl: './gmp.packing.scale.calibration.report.item.html'
})

export class GMPPackingScaleCalibrationReportItemComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}