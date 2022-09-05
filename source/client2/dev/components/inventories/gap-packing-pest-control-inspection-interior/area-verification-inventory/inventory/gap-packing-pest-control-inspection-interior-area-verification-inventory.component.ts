import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryService } from '../services/gap-packing-pest-control-inspection-interior-area-verification-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryAreaVerification } from '../interfaces/gap-packing-pest-control-inspection-interior-area-verification-inventory.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-interior-area-verification-inventory',
  templateUrl: './gap-packing-pest-control-inspection-interior-area-verification-inventory.component.html'
})

export class GAPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryAreaVerification> = []

  constructor(events: PubSubService,
    inventoryService: GAPPackingPestControlInspectionInteriorAreaVerificationInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
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