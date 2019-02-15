import { Component } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-hand-washing-report-loader',
  templateUrl: 'gmp.packing.hand.washing.report.loader.component.html'
})

export class GMPPackingHandWashingReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TranslationService, logService: LogService) {
    super(ts, logService)
  }
}