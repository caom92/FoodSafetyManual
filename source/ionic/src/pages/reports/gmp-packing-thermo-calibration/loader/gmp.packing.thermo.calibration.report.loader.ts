import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'
import { Language } from 'angular-l10n'
import { Report } from '../interfaces/gmp.packing.thermo.calibration.report.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-thermo-calibration-report-loader',
  templateUrl: './gmp.packing.thermo.calibration.report.loader.html'
})

export class GMPPackingThermoCalibrationReportLoader extends SuperReportLoader implements OnInit, OnDestroy {
  @Input() report: Report = null
  @Input() activeReport: string = "any"
  @Language() lang: string
  showReport: boolean = false

  constructor(events: Events) {
    super(events)
  }
}