import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionInteriorProtectionStatusInventoryService } from '../services/gap-packing-pest-control-inspection-interior-protection-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryProtectionStatus } from '../interfaces/gap-packing-pest-control-inspection-interior-protection-status-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-interior-protection-status-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-interior-protection-status-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionInteriorProtectionStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryProtectionStatus

  constructor(inventoryService: GAPPackingPestControlInspectionInteriorProtectionStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}