import { Component } from '@angular/core'
import { StateService } from '@uirouter/angular'

import { BackendService } from '../../../../services/app.backend'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'


@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-viewer',
  templateUrl: 'gmp.self.inspection.pest.control.inventory.viewer.component.html'
})

export class GMPSelfInspectionPestControlInventoryViewerComponent extends SuperInventoryViewer {
  constructor(router: StateService, server: BackendService) {
    super(router, server)
  }
}
