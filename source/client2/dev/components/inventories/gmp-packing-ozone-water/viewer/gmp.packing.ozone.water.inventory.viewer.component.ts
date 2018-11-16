import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { BackendService } from '../../../../services/app.backend'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-packing-ozone-water-inventory-viewer',
  templateUrl: 'gmp.packing.ozone.water.inventory.viewer.component.html'
})

export class GMPPackingOzoneWaterInventoryViewerComponent extends SuperInventoryViewer {
  constructor(routeState: ActivatedRoute, server: BackendService) {
    super(routeState, server)
  }
}
