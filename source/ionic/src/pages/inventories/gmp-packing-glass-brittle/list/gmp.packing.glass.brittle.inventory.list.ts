import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-inventory-list',
  templateUrl: './gmp.packing.glass.brittle.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingGlassBrittleInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() items: Array<InventoryItem> = null

  constructor(dragulaService: DragulaService,
    events: Events,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName("gmp-packing-glass-brittle-bag")
    this.setSuffix("gmp-packing-glass-brittle")
    this.setInventory(this.items)
    super.ngOnInit()
  }

  public ngOnChanges(): void{
    this.setInventory(this.items)
    this.setOriginalInventory(this.items)
  }
}