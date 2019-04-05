import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-glass-brittle-report-loader',
  templateUrl: 'gmp.packing.glass.brittle.report.loader.component.html'
})

export class GMPPackingGlassBrittleReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}