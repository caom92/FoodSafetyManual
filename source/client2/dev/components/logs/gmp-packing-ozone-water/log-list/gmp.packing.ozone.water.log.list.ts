import { Component } from '@angular/core';

import { LogService } from '../../../../services/log.service';
import { SuperLogListComponent } from '../../super-logs/super.logs.list';

@Component({
  selector: 'gmp-packing-ozone-water-log-list',
  templateUrl: './gmp.packing.ozone.water.log.list.html'
})

export class GMPPackingOzoneWaterLogList extends SuperLogListComponent {
  constructor(logService: LogService) {
    super(logService)
  }
}