import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp-packing-harvest-tool-inventory.interface'

@Component({
  selector: '[gmp-packing-harvest-tool-inventory-list]',
  templateUrl: './gmp-packing-harvest-tool-inventory-list.component.html'
})

export class GMPPackingHarvestToolInventoryListComponent extends SuperInventoryListComponent {
  @Input() items: Array<InventoryItem>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-harvest-tool')
    this.setBagName(this.suffix + '-bag')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.getCurrentInventory().length + 1
    this.getCurrentInventory().push(item.item)
  }

  public getCurrentInventory(): Array<InventoryItem> {
    return this.items
  }
}