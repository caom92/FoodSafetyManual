import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-glass-brittle-report-loader',
  templateUrl: 'gmp.packing.glass.brittle.report.loader.component.html'
})

export class GMPPackingGlassBrittleReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService) {
    super(ts)
  }
}