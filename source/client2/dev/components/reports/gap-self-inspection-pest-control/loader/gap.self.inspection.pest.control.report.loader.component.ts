import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-self-inspection-pest-control-report-loader',
  templateUrl: 'gap.self.inspection.pest.control.report.loader.component.html'
})

export class GAPSelfInspectionPestControlReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}