import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gap-packing-harvest-block-inspection-inventory.interface'

@Component({
  selector: '[gap-packing-harvest-block-inspection-inventory-list]',
  templateUrl: './gap-packing-harvest-block-inspection-inventory-list.component.html'
})

export class GAPPackingHarvestBlockInspectionInventoryListComponent extends SuperInventoryListComponent {
  @Input() items: Array<InventoryItem>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-harvest-block-inspection')
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