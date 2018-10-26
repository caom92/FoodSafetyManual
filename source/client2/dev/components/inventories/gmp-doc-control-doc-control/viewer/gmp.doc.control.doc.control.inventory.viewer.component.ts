import { Component } from '@angular/core'
import { StateService } from '@uirouter/core'

import { BackendService } from '../../../../services/app.backend'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-doc-control-doc-control-inventory-viewer',
  templateUrl: './gmp.doc.control.doc.control.inventory.viewer.component.html'
})

export class GMPDocControlDocControlInventoryViewerComponent extends SuperInventoryViewer {
  constructor(router: StateService, server: BackendService) {
    super(router, server)
  }
}