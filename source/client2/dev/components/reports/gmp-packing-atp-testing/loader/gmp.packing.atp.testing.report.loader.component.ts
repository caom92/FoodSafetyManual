import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-atp-testing-report-loader',
  templateUrl: 'gmp.packing.atp.testing.report.loader.component.html'
})

export class GMPPackingATPTestingReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService) {
    super(ts)
  }
}