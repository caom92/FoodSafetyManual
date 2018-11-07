import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-scale-calibration-report-loader',
  templateUrl: 'gmp.packing.scale.calibration.report.loader.component.html'
})

export class GMPPackingScaleCalibrationReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService) {
    super(ts)
  }
}