import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-packing-atp-luminometer-inventory-viewer',
  templateUrl: './gmp.packing.atp.luminometer.inventory.viewer.component.html'
})

export class GMPPackingATPLuminometerInventoryViewerComponent extends SuperInventoryViewer {
  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }
}