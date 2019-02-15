import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.scale.calibration.report.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-report',
  templateUrl: './gmp.packing.scale.calibration.report.html'
})

export class GMPPackingScaleCalibrationReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.even{background-color:#b8e0b9}.typeTitle{background-color:yellow;width:588px}.fullColumn{background-color:#D3D3D3;width:631px}.testColumn{width:57px}.unitColumn{width:70px}.quantityColumn{width:35px}.numberColumn{width:232px}.timeColumn{width:43px}.statusColumn{width:87px}.sanitizedColumn{width:107px}</style>'
  }
}