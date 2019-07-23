import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.packing.cold.room.temp.inventory.interface'

@Component({
  selector: '[gmp-packing-cold-room-temp-inventory-list]',
  templateUrl: './gmp.packing.cold.room.temp.inventory.list.html'
})

export class GMPPackingColdRoomTempInventoryListComponent extends SuperInventoryListComponent {
  @Input() items: Array<InventoryItem>

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-packing-cold-room-temp-bag')
    this.setSuffix('gmp-packing-cold-room-temp')
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