import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingCoolerCleaningCheckInventoryService } from '../services/gap-packing-cooler-cleaning-check-inventory.service'
import { SuperInventoryByAreaComponent } from '../../../super-inventory/super.inventory.by.area'
import { InventoryType } from '../interfaces/gap-packing-cooler-cleaning-check-inventory.interface'
import { AreaInventoryService } from '../../../../../services/area-inventory.service'

@Component({
  selector: 'gap-packing-cooler-cleaning-check-inventory',
  templateUrl: './gap-packing-cooler-cleaning-check-inventory.component.html'
})

export class GAPPackingCoolerCleaningCheckInventoryComponent extends SuperInventoryByAreaComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryType> = []
  public type_array: Array<{ id: number, name: string }> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingCoolerCleaningCheckInventoryService,
    dragulaService: DragulaService,
    areaInventoryService: AreaInventoryService) {
    super(events, inventoryService, dragulaService, areaInventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
    this.setBagName(this.suffix + '-check-inventory-bag')
    super.ngOnInit()
  }

  public loadAreaInventory(event: any) {
    super.loadAreaInventory(event)
  }

  public onInventoryUpdate(): void {
    this.type_array = []
    
    for (let temp of this.inventory) {
      this.type_array.push({ id: temp.id, name: temp.name })
    }
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }

  public initDragula(): void {
    this.addGroup(this.bagName)
  }
}
