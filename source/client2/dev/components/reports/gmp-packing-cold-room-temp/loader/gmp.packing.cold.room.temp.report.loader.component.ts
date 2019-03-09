import { Component } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-cold-room-temp-report-loader',
  templateUrl: 'gmp.packing.cold.room.temp.report.loader.component.html'
})

export class GMPPackingColdRoomTempReportLoaderComponent extends SuperReportLoader {
  constructor(translationService: TranslationService, logService: LogService) {
    super(translationService, logService)
  }
}