import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService } from '../services/gap-packing-pest-control-inspection-interior-equipment-status-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryEquipmentStatus } from '../interfaces/gap-packing-pest-control-inspection-interior-equipment-status-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-interior-equipment-status-inventory-list]',
  templateUrl: './gap-packing-pest-control-inspection-interior-equipment-status-inventory-list.component.html'
})

export class GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryEquipmentStatus>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setBagName(this.suffix + '-bag')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.getCurrentInventory().length + 1
    this.getCurrentInventory().push(item.item)
  }

  public getCurrentInventory(): Array<InventoryEquipmentStatus> {
    return this.items
  }
}