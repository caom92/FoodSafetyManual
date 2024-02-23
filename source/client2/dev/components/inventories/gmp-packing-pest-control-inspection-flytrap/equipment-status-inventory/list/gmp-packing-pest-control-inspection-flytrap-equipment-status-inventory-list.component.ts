import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryEquipmentStatus } from '../interfaces/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory-list]',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory-list.component.html'
})

export class GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryEquipmentStatus>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-flytrap')
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