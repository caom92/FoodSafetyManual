import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-area-verification-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryAreaVerification } from '../interfaces/gmp-packing-pest-control-inspection-exterior-area-verification-inventory.interface'

@Component({
  selector: 'gmp-packing-pest-control-inspection-exterior-area-verification-inventory',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-area-verification-inventory.component.html'
})

export class GMPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryAreaVerification> = []

  constructor(events: PubSubService,
    inventoryService: GMPPackingPestControlInspectionExteriorAreaVerificationInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
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