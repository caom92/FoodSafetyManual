import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingMasterSanitationCorrectiveActionInventoryService } from '../services/gap-packing-master-sanitation-corrective-action-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryCorrectiveAction } from '../interfaces/gap-packing-master-sanitation-corrective-action-inventory.interface'

@Component({
  selector: 'gap-packing-master-sanitation-corrective-action-inventory',
  templateUrl: './gap-packing-master-sanitation-corrective-action-inventory.component.html'
})

export class GAPPackingMasterSanitationCorrectiveActionInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryCorrectiveAction> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingMasterSanitationCorrectiveActionInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
    this.setBagName(this.suffix + '-corrective-action-inventory-bag')
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