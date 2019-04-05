import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-scale-calibration-report-loader',
  templateUrl: 'gmp.packing.scale.calibration.report.loader.component.html'
})

export class GMPPackingScaleCalibrationReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}