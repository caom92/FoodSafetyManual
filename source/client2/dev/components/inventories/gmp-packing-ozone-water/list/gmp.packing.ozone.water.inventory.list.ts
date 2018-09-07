import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.packing.ozone.water.inventory.interface'

@Component({
  selector: '[gmp-packing-ozone-water-inventory-list]',
  templateUrl: './gmp.packing.ozone.water.inventory.list.html'
})

export class GMPPackingOzoneWaterInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() items: Array<InventoryItem> = null

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName("gmp-packing-ozone-water-bag")
    this.setSuffix("gmp-packing-ozone-water")
    this.setInventory(this.items)
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.currentInventory.length + 1
    this.currentInventory.push(item.item)
    this.originalInventory.push(item.item)
  }

  public ngOnChanges(): void {
    this.setInventory(this.items)
    this.setOriginalInventory(this.items)
  }
}