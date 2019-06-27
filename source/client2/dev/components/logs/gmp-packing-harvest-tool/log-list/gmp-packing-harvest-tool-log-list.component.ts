import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperLogListComponent } from '../../super-logs/super.logs.list'

@Component({
  selector: 'gmp-packing-harvest-tool-log-list',
  templateUrl: './gmp-packing-harvest-tool-log-list.component.html'
})

export class GMPPackingHarvestToolLogList extends SuperLogListComponent {
  constructor(logService: LogService) {
    super(logService)
  }
}