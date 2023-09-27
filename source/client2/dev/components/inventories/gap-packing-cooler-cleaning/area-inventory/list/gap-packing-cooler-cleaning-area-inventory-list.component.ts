import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingCoolerCleaningAreaInventoryService } from '../services/gap-packing-cooler-cleaning-area-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryArea } from '../interfaces/gap-packing-cooler-cleaning-area-inventory.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-area-inventory-list]',
  templateUrl: './gap-packing-cooler-cleaning-area-inventory-list.component.html'
})

export class GAPPackingCoolerCleaningAreaInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryArea>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingCoolerCleaningAreaInventoryService) {
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

  public getCurrentInventory(): Array<InventoryArea> {
    return this.items
  }
}