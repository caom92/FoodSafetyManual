import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.thermo.calibration.report.interface'

@Component({
  selector: 'gmp-packing-thermo-calibration-report',
  templateUrl: './gmp.packing.thermo.calibration.report.html'
})

export class GMPPackingThermoCalibrationReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TranslationService) {
    super(ts)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.even{background-color:#b8e0b9}.timeColumn{width:40px}.numberColumn{width:71px}.testColumn{width:70px}.calibrationColumn{width:70px}.sanitizationColumn{width:70px}.deficienciesColumn{width:155px}.actionColumn{width:155px}</style>'
  }
}