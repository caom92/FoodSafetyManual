import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list'
import { InventoryArea } from '../interfaces/gap.packing.preop.area.inventory.interface'

@Component({
  selector: '[gap-packing-preop-area-inventory-list]',
  templateUrl: './gap.packing.preop.area.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GAPPackingPreopAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService, events: PubSubService, areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName("gap-packing-preop-area-bag")
    this.setSuffix("gap-packing-preop")
    this.setInventory(this.areas)
    super.ngOnInit()
  }

  public ngOnChanges(): void {
    this.setInventory(this.areas)
    this.setOriginalInventory(this.areas)
  }
}