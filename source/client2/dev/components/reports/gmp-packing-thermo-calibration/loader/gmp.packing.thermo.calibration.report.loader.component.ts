import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-thermo-calibration-report-loader',
  templateUrl: 'gmp.packing.thermo.calibration.report.loader.component.html'
})

export class GMPPackingThermoCalibrationReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}