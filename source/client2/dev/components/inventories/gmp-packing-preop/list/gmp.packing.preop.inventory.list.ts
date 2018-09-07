import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem, InventoryType } from '../interfaces/gmp.packing.preop.inventory.interface'

@Component({
  selector: '[gmp-packing-preop-inventory-list]',
  templateUrl: './gmp.packing.preop.inventory.list.html'
})

export class GMPPackingPreopInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() items: Array<InventoryItem> = null
  @Input() type: InventoryType

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName(this.type.en)
    this.setSuffix('gmp-packing-preop')
    this.setInventory(this.type.inventory)
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    if (item.type == this.type.id) {
      item.item.position = this.currentInventory.length + 1
      this.currentInventory.push(item.item)
      this.originalInventory.push(item.item)
    }
  }

  public ngOnChanges(): void {
    this.setInventory(this.type.inventory)
    this.setOriginalInventory(this.type.inventory)
  }
}