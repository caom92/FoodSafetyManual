import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryEquipmentStatus } from '../interfaces/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryEquipmentStatus

  constructor(inventoryService: GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}