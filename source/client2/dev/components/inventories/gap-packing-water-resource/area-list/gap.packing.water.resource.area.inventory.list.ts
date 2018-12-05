import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list'
import { InventoryArea } from '../interfaces/gap.packing.water.resource.area.inventory.interface'

@Component({
  selector: '[gap-packing-water-resource-area-inventory-list]',
  templateUrl: './gap.packing.water.resource.area.inventory.list.html'
})

export class GAPPackingWaterResourceAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService, events: PubSubService, areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName('gap-packing-water-resource-area-bag')
    this.setSuffix('gap-packing-water-resource')
    super.ngOnInit()
  }

  public getCurrentInventory(): Array<InventoryArea> {
    return this.areas
  }
}