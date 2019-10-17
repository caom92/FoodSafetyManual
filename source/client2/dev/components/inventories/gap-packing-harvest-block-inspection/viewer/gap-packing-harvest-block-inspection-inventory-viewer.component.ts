import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gap-packing-harvest-block-inspection-inventory-viewer',
  templateUrl: './gap-packing-harvest-block-inspection-inventory-viewer.component.html'
})

export class GAPPackingHarvestBlockInspectionInventoryViewerComponent extends SuperInventoryViewer {
  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }
}