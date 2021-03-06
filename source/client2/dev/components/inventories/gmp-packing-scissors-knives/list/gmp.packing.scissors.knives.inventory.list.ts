import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'

@Component({
  selector: '[gmp-packing-scissors-knives-inventory-list]',
  templateUrl: './gmp.packing.scissors.knives.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingScissorsKnivesInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() items: Array<InventoryItem>
  @Input() private printHeader: boolean = false

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName("gmp-packing-scissors-knives-bag")
    this.setSuffix("gmp-packing-scissors-knives")
    this.setInventory(this.items)
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.currentInventory.length + 1
    this.currentInventory.push(item.item)
    this.originalInventory.push(item.item)
  }

  public ngOnChanges(): void{
    this.setInventory(this.items)
    this.setOriginalInventory(this.items)
  }
}