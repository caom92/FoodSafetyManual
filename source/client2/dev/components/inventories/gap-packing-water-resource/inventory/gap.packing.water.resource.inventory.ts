import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryItem } from '../interfaces/gap.packing.water.resource.inventory.interface'

@Component({
  selector: 'gap-packing-water-resource-inventory',
  templateUrl: './gap.packing.water.resource.inventory.html'
})

export class GAPPackingWaterResourceInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, dragulaService, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName('gap-packing-water-resource-bag')
    this.setSuffix('gap-packing-water-resource')
    super.ngOnInit()
  }

  public onInventoryUpdate(): void {
    // Se debe reimplmentar para evitar que se lance la excepción
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}