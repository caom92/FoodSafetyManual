import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionExteriorAreaVerificationInventoryService } from '../services/gap-packing-pest-control-inspection-exterior-area-verification-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryAreaVerification } from '../interfaces/gap-packing-pest-control-inspection-exterior-area-verification-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-exterior-area-verification-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-exterior-area-verification-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionExteriorAreaVerificationInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryAreaVerification

  constructor(inventoryService: GAPPackingPestControlInspectionExteriorAreaVerificationInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}