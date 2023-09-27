import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingCoolerCleaningTypeInventoryService } from '../services/gap-packing-cooler-cleaning-type-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryType } from '../interfaces/gap-packing-cooler-cleaning-type-inventory.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-type-inventory-list]',
  templateUrl: './gap-packing-cooler-cleaning-type-inventory-list.component.html'
})

export class GAPPackingCoolerCleaningTypeInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryType>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingCoolerCleaningTypeInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
    this.setBagName(this.suffix + '-bag')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.getCurrentInventory().length + 1
    this.getCurrentInventory().push(item.item)
  }

  public getCurrentInventory(): Array<InventoryType> {
    return this.items
  }
}