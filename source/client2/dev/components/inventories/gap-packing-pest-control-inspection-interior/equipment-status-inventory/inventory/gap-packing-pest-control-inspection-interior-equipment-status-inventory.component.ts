import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService } from '../services/gap-packing-pest-control-inspection-interior-equipment-status-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryEquipmentStatus } from '../interfaces/gap-packing-pest-control-inspection-interior-equipment-status-inventory.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-interior-equipment-status-inventory',
  templateUrl: './gap-packing-pest-control-inspection-interior-equipment-status-inventory.component.html'
})

export class GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryEquipmentStatus> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setBagName(this.suffix + '-equipment-status-inventory-bag')
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