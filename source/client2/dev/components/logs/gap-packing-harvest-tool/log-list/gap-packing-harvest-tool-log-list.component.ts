import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperLogListComponent } from '../../super-logs/super.logs.list'

@Component({
  selector: 'gap-packing-harvest-tool-log-list',
  templateUrl: './gap-packing-harvest-tool-log-list.component.html'
})

export class GAPPackingHarvestToolLogList extends SuperLogListComponent {
  constructor(logService: LogService) {
    super(logService)
  }
}