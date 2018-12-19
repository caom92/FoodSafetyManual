import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-aged-product-report-loader',
  templateUrl: 'gmp.packing.aged.product.report.loader.component.html'
})

export class GMPPackingAgedProductReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService, logService: LogService) {
    super(ts, logService)
  }
}