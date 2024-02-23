import { Component } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperLogListComponent } from '../../super-logs/super.logs.list'

@Component({
  selector: 'gmp-packing-pest-control-inspection-flytrap-log-list',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-log-list.component.html'
})

export class GMPPackingPestControlInspectionFlytrapLogList extends SuperLogListComponent {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string

  constructor(logService: LogService) {
    super(logService)
  }
}