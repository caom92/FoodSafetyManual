import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-interior-protection-status-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryProtectionStatus } from '../interfaces/gmp-packing-pest-control-inspection-interior-protection-status-inventory.interface'

@Component({
  selector: 'gmp-packing-pest-control-inspection-interior-protection-status-inventory',
  templateUrl: './gmp-packing-pest-control-inspection-interior-protection-status-inventory.component.html'
})

export class GMPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryProtectionStatus> = []

  constructor(events: PubSubService,
    inventoryService: GMPPackingPestControlInspectionInteriorProtectionStatusInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-interior')
    this.setBagName(this.suffix + '-protection-status-inventory-bag')
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