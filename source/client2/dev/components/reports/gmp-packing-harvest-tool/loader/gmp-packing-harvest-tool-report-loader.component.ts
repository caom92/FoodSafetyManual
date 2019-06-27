import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-harvest-tool-report-loader',
  templateUrl: 'gmp-packing-harvest-tool-report-loader.component.html'
})

export class GMPPackingHarvestToolReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}