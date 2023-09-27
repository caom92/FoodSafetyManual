import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingCoolerCleaningCheckInventoryService } from '../services/gap-packing-cooler-cleaning-check-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryCheck, InventoryType } from '../interfaces/gap-packing-cooler-cleaning-check-inventory.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-check-inventory-list]',
  templateUrl: './gap-packing-cooler-cleaning-check-inventory-list.component.html'
})

export class GAPPackingCoolerCleaningCheckInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryCheck>
  @Input() type: InventoryType
  @Input() areaID: number

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingCoolerCleaningCheckInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName(this.type.name)
    this.setSuffix('gap-packing-cooler-cleaning')
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