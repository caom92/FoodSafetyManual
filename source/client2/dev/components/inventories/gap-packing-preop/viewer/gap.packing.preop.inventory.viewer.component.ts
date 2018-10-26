import { Component } from '@angular/core'
import { StateService } from '@uirouter/core'

import { BackendService } from '../../../../services/app.backend'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gap-packing-preop-inventory-viewer',
  templateUrl: 'gap.packing.preop.inventory.viewer.component.html'
})

export class GAPPackingPreopInventoryViewerComponent extends SuperInventoryViewer {
  constructor(router: StateService, server: BackendService) {
    super(router, server)
  }
}
