import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-bathroom-cleaning-report-loader',
  templateUrl: 'gap-packing-bathroom-cleaning-report-loader.component.html'
})

export class GAPPackingBathroomCleaningReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}