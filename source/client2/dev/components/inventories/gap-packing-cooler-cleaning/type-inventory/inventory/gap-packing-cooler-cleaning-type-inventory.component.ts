import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingCoolerCleaningTypeInventoryService } from '../services/gap-packing-cooler-cleaning-type-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryType } from '../interfaces/gap-packing-cooler-cleaning-type-inventory.interface'

@Component({
  selector: 'gap-packing-cooler-cleaning-type-inventory',
  templateUrl: './gap-packing-cooler-cleaning-type-inventory.component.html'
})

export class GAPPackingCoolerCleaningTypeInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryType> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingCoolerCleaningTypeInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
    this.setBagName(this.suffix + '-type-inventory-bag')
    super.ngOnInit()
  }

  public onInventoryUpdate(): void {
    // Se debe reimplmentar para evitar que se lance la excepción
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }

  public initDragula(): void {
    this.addGroup(this.bagName)
  }
}