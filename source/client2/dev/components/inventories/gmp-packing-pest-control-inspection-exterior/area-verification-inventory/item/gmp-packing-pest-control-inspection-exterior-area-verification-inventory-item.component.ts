import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-area-verification-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryAreaVerification } from '../interfaces/gmp-packing-pest-control-inspection-exterior-area-verification-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-exterior-area-verification-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-area-verification-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionExteriorAreaVerificationInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryAreaVerification

  constructor(inventoryService: GMPPackingPestControlInspectionExteriorAreaVerificationInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}