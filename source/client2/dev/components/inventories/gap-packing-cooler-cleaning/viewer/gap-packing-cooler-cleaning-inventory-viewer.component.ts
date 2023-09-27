import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gap-packing-cooler-cleaning-inventory-viewer',
  templateUrl: './gap-packing-cooler-cleaning-inventory-viewer.component.html',
  styleUrls: ['./custom-collection.css']
})

export class GAPPackingCoolerCleaningInventoryViewerComponent extends SuperInventoryViewer {
  @Language() lang: string
  inventories: Array<{ name: string, code: string }>

  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }

  ngOnInit() {
    super.ngOnInit()
    
    this.inventories = [
      {
        name: 'Areas',
        code: 'area'
      },
      {
        name: 'Tipos',
        code: 'type'
      },
      {
        name: 'Verificaciones',
        code: 'check'
      }/*,
      {
        name: 'Acciones correctivas',
        code: 'corrective-action'
      }*/
    ]
  }
}