import { Component, Input } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gap-packing-cooler-cleaning-report.interface'

@Component({
  selector: 'gap-packing-cooler-cleaning-report-loader',
  templateUrl: 'gap-packing-cooler-cleaning-report-loader.component.html'
})

export class GAPPackingCoolerCleaningReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(logService: LogService) {
    super(logService)
  }
}
