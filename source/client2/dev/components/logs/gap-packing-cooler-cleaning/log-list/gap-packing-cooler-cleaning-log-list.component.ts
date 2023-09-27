import { Component } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperLogListComponent } from '../../super-logs/super.logs.list'

@Component({
  selector: 'gap-packing-cooler-cleaning-log-list',
  templateUrl: './gap-packing-cooler-cleaning-log-list.component.html'
})

export class GAPPackingCoolerCleaningLogList extends SuperLogListComponent {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string

  constructor(logService: LogService) {
    super(logService)
  }
}
