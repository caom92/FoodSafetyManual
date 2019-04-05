import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-ozone-water-report-loader',
  templateUrl: 'gmp.packing.ozone.water.report.loader.component.html'
})

export class GMPPackingOzoneWaterReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}