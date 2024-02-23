import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionExteriorPestTypeInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-pest-type-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryPestType } from '../interfaces/gmp-packing-pest-control-inspection-exterior-pest-type-inventory.interface'

@Component({
  selector: 'gmp-packing-pest-control-inspection-exterior-pest-type-inventory',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-pest-type-inventory.component.html'
})

export class GMPPackingPestControlInspectionExteriorPestTypeInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryPestType> = []

  constructor(events: PubSubService,
    inventoryService: GMPPackingPestControlInspectionExteriorPestTypeInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    this.setBagName(this.suffix + '-pest-type-inventory-bag')
    super.ngOnInit()
  }

  public onInventoryUpdate(): void {
    // Se debe reimplmentar para evitar que se lance la excepción
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }

  public initDragula(): void {
    this.addGroup(this.bagName)
  }
}