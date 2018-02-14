import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.scale.calibration.report.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-report',
  templateUrl: './gmp.packing.scale.calibration.report.html'
})

export class GMPPackingScaleCalibrationReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
  }

  public getCSS(): string {
    return "<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.typeTitle{ background-color: yellow; width:588px;}.fullColumn{ background-color: #D3D3D3;width:631px;}.testColumn{ width:77px;}.unitColumn{ width:70px;}.numberColumn{ width:147px;}.timeColumn{ width:43px;}.statusColumn{ width:147px;}.sanitizedColumn{ width:147px;}</style>"
  }
}