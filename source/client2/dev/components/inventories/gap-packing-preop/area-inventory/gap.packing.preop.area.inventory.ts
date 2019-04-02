import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaInventoryService } from '../../../../services/area-inventory.service'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
import { InventoryArea } from '../interfaces/gap.packing.preop.area.inventory.interface'

@Component({
  selector: 'gap-packing-preop-area-inventory',
  templateUrl: './gap.packing.preop.area.inventory.html'
})

export class GAPPackingPreopAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(dragulaService: DragulaService, events: PubSubService, areaInventoryService: AreaInventoryService) {
    super(dragulaService, events, areaInventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-preop')
    this.setBagName(this.suffix + '-area-bag')
    super.ngOnInit()
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}