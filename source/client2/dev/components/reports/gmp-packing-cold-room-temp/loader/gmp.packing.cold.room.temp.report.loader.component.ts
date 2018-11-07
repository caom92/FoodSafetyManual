import { Component } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { SuperReportLoader } from '../../super-report/super.report.loader'

@Component({
  selector: 'gmp-packing-cold-room-temp-report-loader',
  templateUrl: 'gmp.packing.cold.room.temp.report.loader.component.html'
})

export class GMPPackingColdRoomTempReportLoaderComponent extends SuperReportLoader {
  constructor(ts: TService) {
    super(ts)
  }
}