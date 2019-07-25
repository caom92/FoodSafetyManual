import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-packing-harvest-tool-inventory-viewer',
  templateUrl: './gmp-packing-harvest-tool-inventory-viewer.component.html'
})

export class GMPPackingHarvestToolInventoryViewerComponent extends SuperInventoryViewer {
  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }
}