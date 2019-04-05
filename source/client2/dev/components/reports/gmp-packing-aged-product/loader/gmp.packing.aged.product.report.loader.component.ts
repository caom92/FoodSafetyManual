import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-aged-product-report-loader',
  templateUrl: 'gmp.packing.aged.product.report.loader.component.html'
})

export class GMPPackingAgedProductReportLoaderComponent extends SuperReportLoader {
  constructor(logService: LogService) {
    super(logService)
  }
}