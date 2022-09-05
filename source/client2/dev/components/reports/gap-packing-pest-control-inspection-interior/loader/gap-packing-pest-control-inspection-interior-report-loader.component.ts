import { Component, Input } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gap-packing-pest-control-inspection-interior-report.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-interior-report-loader',
  templateUrl: 'gap-packing-pest-control-inspection-interior-report-loader.component.html'
})

export class GAPPackingPestControlInspectionInteriorReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(logService: LogService) {
    super(logService)
  }
}