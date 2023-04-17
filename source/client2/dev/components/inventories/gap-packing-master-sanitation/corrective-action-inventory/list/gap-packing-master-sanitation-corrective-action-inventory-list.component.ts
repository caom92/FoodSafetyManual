import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingMasterSanitationCorrectiveActionInventoryService } from '../services/gap-packing-master-sanitation-corrective-action-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryCorrectiveAction } from '../interfaces/gap-packing-master-sanitation-corrective-action-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-corrective-action-inventory-list]',
  templateUrl: './gap-packing-master-sanitation-corrective-action-inventory-list.component.html'
})

export class GAPPackingMasterSanitationCorrectiveActionInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryCorrectiveAction>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingMasterSanitationCorrectiveActionInventoryService) {
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

  public getCurrentInventory(): Array<InventoryCorrectiveAction> {
    return this.items
  }
}