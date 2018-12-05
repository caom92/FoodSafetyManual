import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gap.packing.water.resource.inventory.interface'

@Component({
  selector: '[gap-packing-water-resource-inventory-list]',
  templateUrl: './gap.packing.water.resource.inventory.list.html'
})

export class GAPPackingWaterResourceInventoryListComponent extends SuperInventoryListComponent implements OnInit {
  @Language() private lang: string
  @Input() items: Array<InventoryItem>

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName('gap-packing-water-resource-bag')
    this.setSuffix('gap-packing-water-resource')
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