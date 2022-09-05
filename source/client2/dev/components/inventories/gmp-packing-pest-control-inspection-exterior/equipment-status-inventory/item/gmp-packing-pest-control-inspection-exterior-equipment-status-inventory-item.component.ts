import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryEquipmentStatus } from '../interfaces/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-exterior-equipment-status-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-equipment-status-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryEquipmentStatus

  constructor(inventoryService: GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}