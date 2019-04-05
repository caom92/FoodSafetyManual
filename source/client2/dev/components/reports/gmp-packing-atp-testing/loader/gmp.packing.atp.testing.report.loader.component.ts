import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-atp-testing-report-loader',
  templateUrl: 'gmp.packing.atp.testing.report.loader.component.html'
})

export class GMPPackingATPTestingReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}