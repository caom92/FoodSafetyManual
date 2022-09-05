import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-area-verification-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryAreaVerification } from '../interfaces/gap-packing-pest-control-inspection-flytrap-area-verification-inventory.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-flytrap-area-verification-inventory',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-area-verification-inventory.component.html'
})

export class GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryAreaVerification> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setBagName(this.suffix + '-area-verification-inventory-bag')
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