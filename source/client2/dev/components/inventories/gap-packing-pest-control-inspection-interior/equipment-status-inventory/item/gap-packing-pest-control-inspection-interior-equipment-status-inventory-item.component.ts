import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService } from '../services/gap-packing-pest-control-inspection-interior-equipment-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryEquipmentStatus } from '../interfaces/gap-packing-pest-control-inspection-interior-equipment-status-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-interior-equipment-status-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-interior-equipment-status-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryEquipmentStatus

  constructor(inventoryService: GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}