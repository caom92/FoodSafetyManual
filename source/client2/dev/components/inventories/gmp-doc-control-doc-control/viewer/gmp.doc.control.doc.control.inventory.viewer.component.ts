import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gmp-doc-control-doc-control-inventory-viewer',
  templateUrl: './gmp.doc.control.doc.control.inventory.viewer.component.html'
})

export class GMPDocControlDocControlInventoryViewerComponent extends SuperInventoryViewer {
  @Language() lang: string

  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }
}