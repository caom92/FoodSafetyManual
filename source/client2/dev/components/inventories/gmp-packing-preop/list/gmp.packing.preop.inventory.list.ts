import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem, InventoryType } from '../interfaces/gmp.packing.preop.inventory.interface'

@Component({
  selector: '[gmp-packing-preop-inventory-list]',
  templateUrl: './gmp.packing.preop.inventory.list.html'
})

export class GMPPackingPreopInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() type: InventoryType

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName(this.type.en)
    this.setSuffix('gmp-packing-preop')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    if (item.type == this.type.id) {
      item.item.position = this.getCurrentInventory().length + 1
      this.getCurrentInventory().push(item.item)
    }
  }

  public getCurrentInventory(): Array<InventoryItem> {
    return this.type.inventory
  }
}