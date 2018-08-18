import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula/components/dragula.provider'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryItem } from '../interfaces/gmp.packing.ozone.water.inventory.interface'

@Component({
  selector: 'gmp-packing-ozone-water-inventory',
  templateUrl: './gmp.packing.ozone.water.inventory.html'
})

export class GMPPackingOzoneWaterInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, dragulaService, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-ozone-water")
    super.ngOnInit()
  }

  public onInventoryUpdate(): void {

  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}