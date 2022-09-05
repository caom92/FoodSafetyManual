import { Component, Input } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp-packing-pest-control-inspection-interior-report.interface'

@Component({
  selector: 'gmp-packing-pest-control-inspection-interior-report-loader',
  templateUrl: 'gmp-packing-pest-control-inspection-interior-report-loader.component.html'
})

export class GMPPackingPestControlInspectionInteriorReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(logService: LogService) {
    super(logService)
  }
}