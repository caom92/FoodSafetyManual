import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryService } from '../services/gap-packing-pest-control-inspection-interior-area-verification-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryAreaVerification } from '../interfaces/gap-packing-pest-control-inspection-interior-area-verification-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-interior-area-verification-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-interior-area-verification-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionInteriorAreaVerificationInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryAreaVerification

  constructor(inventoryService: GAPPackingPestControlInspectionInteriorAreaVerificationInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}