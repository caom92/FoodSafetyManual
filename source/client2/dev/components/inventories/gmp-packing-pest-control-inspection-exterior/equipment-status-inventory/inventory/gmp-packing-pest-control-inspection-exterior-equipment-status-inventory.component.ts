import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.service'
import { SuperInventoryComponent } from '../../../super-inventory/super.inventory'
import { InventoryEquipmentStatus } from '../interfaces/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.interface'

@Component({
  selector: 'gmp-packing-pest-control-inspection-exterior-equipment-status-inventory',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.component.html'
})

export class GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent extends SuperInventoryComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryEquipmentStatus> = []

  constructor(events: PubSubService,
    inventoryService: GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    this.setBagName(this.suffix + '-equipment-status-inventory-bag')
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