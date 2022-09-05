import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryCorrectiveAction } from '../interfaces/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-flytrap-corrective-action-inventory',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.component.html'
})

export class GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryCorrectiveAction> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
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