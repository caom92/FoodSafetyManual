import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-interior-protection-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryProtectionStatus } from '../interfaces/gmp-packing-pest-control-inspection-interior-protection-status-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-interior-protection-status-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-interior-protection-status-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionInteriorProtectionStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryProtectionStatus

  constructor(inventoryService: GMPPackingPestControlInspectionInteriorProtectionStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}