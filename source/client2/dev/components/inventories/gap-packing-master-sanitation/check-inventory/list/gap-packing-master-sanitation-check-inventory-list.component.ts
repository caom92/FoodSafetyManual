import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingMasterSanitationCheckInventoryService } from '../services/gap-packing-master-sanitation-check-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryCheck, InventoryType } from '../interfaces/gap-packing-master-sanitation-check-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-check-inventory-list]',
  templateUrl: './gap-packing-master-sanitation-check-inventory-list.component.html'
})

export class GAPPackingMasterSanitationCheckInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryCheck>
  @Input() type: InventoryType
  @Input() areaID: number

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingMasterSanitationCheckInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName(this.type.name)
    this.setSuffix('gap-packing-master-sanitation')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    if (item.type == this.type.id && item.area_id == this.areaID) {
      item.item.position = this.getCurrentInventory().length + 1
      this.getCurrentInventory().push(item.item)
      item.added = true
    }
  }

  public getCurrentInventory(): Array<InventoryCheck> {
    return this.type.inventory
  }
}