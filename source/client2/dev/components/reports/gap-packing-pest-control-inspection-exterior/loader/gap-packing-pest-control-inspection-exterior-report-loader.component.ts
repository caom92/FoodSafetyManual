import { Component, Input } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gap-packing-pest-control-inspection-exterior-report.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-exterior-report-loader',
  templateUrl: 'gap-packing-pest-control-inspection-exterior-report-loader.component.html'
})

export class GAPPackingPestControlInspectionExteriorReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(logService: LogService) {
    super(logService)
  }
}