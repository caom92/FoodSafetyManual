import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-harvest-machine-cleaning-report-loader',
  templateUrl: 'gap-packing-harvest-machine-cleaning-report-loader.component.html'
})

export class GAPPackingHarvestMachineCleaningReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}