import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem, InventoryType } from '../interfaces/gap.packing.preop.inventory.interface'

@Component({
  selector: 'gap-packing-preop-inventory-list',
  templateUrl: './gap.packing.preop.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GAPPackingPreopInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() items: Array<InventoryItem> = null
  @Input() type: InventoryType

  constructor(dragulaService: DragulaService,
    events: Events,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    console.log(this.type)
    this.setBagName("gap-packing-preop-bag")
    this.setSuffix("gap-packing-preop")
    this.setInventory(this.type.inventory)
    super.ngOnInit()
  }

  public ngOnChanges(): void{
    this.setInventory(this.type.inventory)
    this.setOriginalInventory(this.type.inventory)
  }
}