import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-pest-type-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryPestType } from '../interfaces/gap-packing-pest-control-inspection-flytrap-pest-type-inventory.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-flytrap-pest-type-inventory',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-pest-type-inventory.component.html'
})

export class GAPPackingPestControlInspectionFlytrapPestTypeInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryPestType> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingPestControlInspectionFlytrapPestTypeInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
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