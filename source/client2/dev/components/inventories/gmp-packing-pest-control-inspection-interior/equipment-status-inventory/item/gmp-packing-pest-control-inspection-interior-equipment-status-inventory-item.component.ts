import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-interior-equipment-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryEquipmentStatus } from '../interfaces/gmp-packing-pest-control-inspection-interior-equipment-status-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-interior-equipment-status-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-interior-equipment-status-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryEquipmentStatus

  constructor(inventoryService: GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}