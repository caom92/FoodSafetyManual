import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-others-unusual-occurrence-report-loader',
  templateUrl: 'gap.others.unusual.occurrence.report.loader.component.html'
})

export class GAPOthersUnusualOccurrenceReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService) {
    super(ts)
  }
}