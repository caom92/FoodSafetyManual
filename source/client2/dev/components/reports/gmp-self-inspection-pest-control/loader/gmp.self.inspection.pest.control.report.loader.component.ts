import { Component } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-self-inspection-pest-control-report-loader',
  templateUrl: 'gmp.self.inspection.pest.control.report.loader.component.html'
})

export class GMPSelfInspectionPestControlReportLoaderComponent extends SuperReportLoader {
  constructor(translationService: TranslationService, logService: LogService) {
    super(translationService, logService)
  }
}