import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-others-unusual-occurrence-report-loader',
  templateUrl: 'gmp.others.unusual.occurrence.report.loader.component.html'
})

export class GMPOthersUnusualOccurrenceReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService) {
    super(ts)
  }
}