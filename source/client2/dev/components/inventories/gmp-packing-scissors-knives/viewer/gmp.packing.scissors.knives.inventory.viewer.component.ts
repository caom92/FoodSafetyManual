import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-packing-scissors-knives-inventory-viewer',
  templateUrl: './gmp.packing.scissors.knives.inventory.viewer.component.html'
})

export class GMPPackingScissorsKnivesInventoryViewerComponent extends SuperInventoryViewer {
  @Language() lang: string

  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }
}