import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'

@Component({
  selector: '[gmp-packing-glass-brittle-inventory-list]',
  templateUrl: './gmp.packing.glass.brittle.inventory.list.html'
})

export class GMPPackingGlassBrittleInventoryListComponent extends SuperInventoryListComponent implements OnInit {
  @Language() private lang: string
  @Input() items: Array<InventoryItem>

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-packing-glass-brittle-bag')
    this.setSuffix('gmp-packing-glass-brittle')
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