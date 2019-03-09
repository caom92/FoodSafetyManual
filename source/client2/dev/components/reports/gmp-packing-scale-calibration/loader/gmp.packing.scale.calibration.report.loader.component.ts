import { Component } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-scale-calibration-report-loader',
  templateUrl: 'gmp.packing.scale.calibration.report.loader.component.html'
})

export class GMPPackingScaleCalibrationReportLoaderComponent extends SuperReportLoader {
  constructor(translationService: TranslationService, logService: LogService) {
    super(translationService, logService)
  }
}