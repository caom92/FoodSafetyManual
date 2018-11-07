import { Component } from '@angular/core'
import { StateService } from '@uirouter/angular'

import { BackendService } from '../../../../services/app.backend'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-packing-thermo-calibration-inventory-viewer',
  templateUrl: './gmp.packing.thermo.calibration.inventory.viewer.component.html'
})

export class GMPPackingThermoCalibrationInventoryViewerComponent extends SuperInventoryViewer {
  constructor(router: StateService, server: BackendService) {
    super(router, server)
  }
}