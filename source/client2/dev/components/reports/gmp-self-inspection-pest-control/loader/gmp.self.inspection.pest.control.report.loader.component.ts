import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-self-inspection-pest-control-report-loader',
  templateUrl: 'gmp.self.inspection.pest.control.report.loader.component.html'
})

export class GMPSelfInspectionPestControlReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}