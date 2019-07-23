import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaInventoryService } from '../../../../services/area-inventory.service'
import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryItem } from '../interfaces/gap.packing.water.resource.inventory.interface'

@Component({
  selector: 'gap-packing-water-resource-inventory',
  templateUrl: './gap.packing.water.resource.inventory.html'
})

export class GAPPackingWaterResourceInventoryComponent extends SuperInventoryByAreaComponent {
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService,
    areaInventoryService: AreaInventoryService) {
    super(events, inventoryService, dragulaService, areaInventoryService)
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