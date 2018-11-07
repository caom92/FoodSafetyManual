import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-preop-report-loader',
  templateUrl: 'gap.packing.preop.report.loader.component.html'
})

export class GAPPackingPreopReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService) {
    super(ts)
  }
}