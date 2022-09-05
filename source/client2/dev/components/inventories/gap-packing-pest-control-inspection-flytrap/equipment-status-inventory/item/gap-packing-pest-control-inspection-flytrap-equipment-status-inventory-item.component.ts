import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryEquipmentStatus } from '../interfaces/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-flytrap-equipment-status-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-equipment-status-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryEquipmentStatus

  constructor(inventoryService: GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}