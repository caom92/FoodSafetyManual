import { Component } from '@angular/core'
import { StateService } from '@uirouter/core'

import { BackendService } from '../../../../services/app.backend'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-packing-scale-calibration-inventory-viewer',
  templateUrl: './gmp.packing.scale.calibration.inventory.viewer.component.html'
})

export class GMPPackingScaleCalibrationInventoryViewerComponent extends SuperInventoryViewer {
  constructor(router: StateService, server: BackendService) {
    super(router, server)
  }
}