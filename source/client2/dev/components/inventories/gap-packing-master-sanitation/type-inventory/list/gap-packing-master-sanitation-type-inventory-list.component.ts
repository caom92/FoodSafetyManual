import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingMasterSanitationTypeInventoryService } from '../services/gap-packing-master-sanitation-type-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryType } from '../interfaces/gap-packing-master-sanitation-type-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-type-inventory-list]',
  templateUrl: './gap-packing-master-sanitation-type-inventory-list.component.html'
})

export class GAPPackingMasterSanitationTypeInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryType>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingMasterSanitationTypeInventoryService) {
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

  public getCurrentInventory(): Array<InventoryType> {
    return this.items
  }
}