import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-water-resource-report-loader',
  templateUrl: 'gap.packing.water.resource.report.loader.component.html'
})

export class GAPPackingWaterResourceReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}