import { Component, Input } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gap-packing-master-sanitation-report.interface'

@Component({
  selector: 'gap-packing-master-sanitation-report-loader',
  templateUrl: 'gap-packing-master-sanitation-report-loader.component.html'
})

export class GAPPackingMasterSanitationReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(logService: LogService) {
    super(logService)
  }
}
