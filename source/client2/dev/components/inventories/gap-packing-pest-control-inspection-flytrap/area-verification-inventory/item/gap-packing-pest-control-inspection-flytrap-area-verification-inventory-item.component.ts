import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-area-verification-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryAreaVerification } from '../interfaces/gap-packing-pest-control-inspection-flytrap-area-verification-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-flytrap-area-verification-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-area-verification-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryAreaVerification

  constructor(inventoryService: GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}