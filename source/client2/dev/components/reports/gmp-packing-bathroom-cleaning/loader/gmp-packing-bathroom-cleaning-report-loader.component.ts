import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-bathroom-cleaning-report-loader',
  templateUrl: 'gmp-packing-bathroom-cleaning-report-loader.component.html'
})

export class GMPPackingBathroomCleaningReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}