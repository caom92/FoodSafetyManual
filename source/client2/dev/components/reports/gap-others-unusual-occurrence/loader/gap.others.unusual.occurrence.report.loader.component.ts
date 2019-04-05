import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-others-unusual-occurrence-report-loader',
  templateUrl: 'gap.others.unusual.occurrence.report.loader.component.html'
})

export class GAPOthersUnusualOccurrenceReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}