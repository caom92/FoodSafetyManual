import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-hand-washing-report-loader',
  templateUrl: 'gmp.packing.hand.washing.report.loader.component.html'
})

export class GMPPackingHandWashingReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}