import { Component } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-scissors-knives-report-loader',
  templateUrl: 'gmp.packing.scissors.knives.report.loader.component.html'
})

export class GMPPackingScissorsKnivesReportLoaderComponent extends SuperReportLoader {
  constructor(translationService: TranslationService, logService: LogService) {
    super(translationService, logService)
  }
}