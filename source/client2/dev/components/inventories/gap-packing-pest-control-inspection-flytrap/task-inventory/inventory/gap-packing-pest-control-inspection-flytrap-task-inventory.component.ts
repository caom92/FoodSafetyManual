import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionFlytrapTaskInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-task-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryTask } from '../interfaces/gap-packing-pest-control-inspection-flytrap-task-inventory.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-flytrap-task-inventory',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-task-inventory.component.html'
})

export class GAPPackingPestControlInspectionFlytrapTaskInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryTask> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingPestControlInspectionFlytrapTaskInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setBagName(this.suffix + '-task-inventory-bag')
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