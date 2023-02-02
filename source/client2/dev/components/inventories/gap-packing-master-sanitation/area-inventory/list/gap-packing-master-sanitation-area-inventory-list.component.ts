import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingMasterSanitationAreaInventoryService } from '../services/gap-packing-master-sanitation-area-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryArea } from '../interfaces/gap-packing-master-sanitation-area-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-area-inventory-list]',
  templateUrl: './gap-packing-master-sanitation-area-inventory-list.component.html'
})

export class GAPPackingMasterSanitationAreaInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryArea>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingMasterSanitationAreaInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
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