import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gap-packing-water-resource-report-loader',
  templateUrl: 'gap.packing.water.resource.report.loader.component.html'
})

export class GAPPackingWaterResourceReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService, logService: LogService) {
    super(ts, logService)
  }
}