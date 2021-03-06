import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-list',
  templateUrl: './gmp.self.inspection.pest.control.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPSelfInspectionPestControlInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() items: Array<InventoryItem> = null

  constructor(dragulaService: DragulaService,
    events: Events,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName("gmp-self-inspection-pest-control-bag")
    this.setSuffix("gmp-self-inspection-pest-control")
    this.setInventory(this.items)
    super.ngOnInit()
  }

  public ngOnChanges(): void{
    this.setInventory(this.items)
    this.setOriginalInventory(this.items)
  }
}