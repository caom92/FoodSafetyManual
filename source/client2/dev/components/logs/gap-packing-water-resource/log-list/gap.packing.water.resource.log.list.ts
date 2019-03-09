import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperLogListComponent } from '../../super-logs/super.logs.list'

@Component({
  selector: 'gap-packing-water-resource-log-list',
  templateUrl: './gap.packing.water.resource.log.list.html'
})

export class GAPPackingWaterResourceLogList extends SuperLogListComponent {
  constructor(logService: LogService) {
    super(logService)
  }
}