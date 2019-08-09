import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-viewer',
  templateUrl: './gmp.self.inspection.pest.control.inventory.viewer.component.html'
})

export class GMPSelfInspectionPestControlInventoryViewerComponent extends SuperInventoryViewer {
  @Language() lang: string

  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }
}
