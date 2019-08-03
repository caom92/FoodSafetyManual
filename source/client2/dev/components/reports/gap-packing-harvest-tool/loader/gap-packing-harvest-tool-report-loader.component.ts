import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-harvest-tool-report-loader',
  templateUrl: 'gap-packing-harvest-tool-report-loader.component.html'
})

export class GAPPackingHarvestToolReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}