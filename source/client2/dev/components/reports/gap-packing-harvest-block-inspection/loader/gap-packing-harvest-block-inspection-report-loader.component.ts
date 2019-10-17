import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-harvest-block-inspection-report-loader',
  templateUrl: 'gap-packing-harvest-block-inspection-report-loader.component.html'
})

export class GAPPackingHarvestBlockInspectionReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}