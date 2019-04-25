import { Component } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { SuperLogListComponent } from '../../super-logs/super.logs.list'

@Component({
  selector: 'gmp-packing-atp-luminometer-log-list',
  templateUrl: './gmp.packing.atp.luminometer.log.list.html'
})

export class GMPPackingATPLuminometerLogList extends SuperLogListComponent {
  constructor(logService: LogService) {
    super(logService)
  }
}