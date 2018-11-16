import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { BackendService } from '../../../../services/app.backend'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-packing-glass-brittle-inventory-viewer',
  templateUrl: 'gmp.packing.glass.brittle.inventory.viewer.component.html'
})

export class GMPPackingGlassBrittleInventoryViewerComponent extends SuperInventoryViewer {
  constructor(routeState: ActivatedRoute, server: BackendService) {
    super(routeState, server)
  }
}
