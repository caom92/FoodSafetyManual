import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.thermo.calibration.report.interface'

@Component({
  selector: 'gmp-packing-thermo-calibration-report-displayer',
  templateUrl: './gmp.packing.thermo.calibration.report.displayer.html'
})

export class GMPPackingThermoCalibrationReportDisplayer {
  @Input() reports: Array<Report> = null
  @Input() activeReport: string = "any"
  @Language() lang: string

  constructor() {
    
  }
}