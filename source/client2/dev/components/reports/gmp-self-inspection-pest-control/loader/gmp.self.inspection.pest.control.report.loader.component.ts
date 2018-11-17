import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-self-inspection-pest-control-report-loader',
  templateUrl: 'gmp.self.inspection.pest.control.report.loader.component.html'
})

export class GMPSelfInspectionPestControlReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService, logService: LogService) {
    super(ts, logService)
  }
}