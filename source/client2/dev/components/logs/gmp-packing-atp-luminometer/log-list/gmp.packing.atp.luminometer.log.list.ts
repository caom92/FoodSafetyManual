import { Component } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperLogListComponent } from '../../super-logs/super.logs.list'

@Component({
  selector: 'gmp-packing-atp-luminometer-log-list',
  templateUrl: './gmp.packing.atp.luminometer.log.list.html'
})

export class GMPPackingATPLuminometerLogList extends SuperLogListComponent {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string

  constructor(logService: LogService) {
    super(logService)
  }
}