import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryService } from '../services/gap-packing-pest-control-inspection-exterior-equipment-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryEquipmentStatus } from '../interfaces/gap-packing-pest-control-inspection-exterior-equipment-status-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-exterior-equipment-status-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-exterior-equipment-status-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryEquipmentStatus

  constructor(inventoryService: GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}