import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-atp-luminometer-report-loader',
  templateUrl: 'gmp.packing.atp.luminometer.report.loader.component.html'
})

export class GMPPackingATPLuminometerReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}