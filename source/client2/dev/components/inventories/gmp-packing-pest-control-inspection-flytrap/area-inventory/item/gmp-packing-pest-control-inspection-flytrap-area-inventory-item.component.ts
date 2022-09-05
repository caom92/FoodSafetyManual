import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionFlytrapAreaInventoryService } from '../services/gmp-packing-pest-control-inspection-flytrap-area-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryArea } from '../interfaces/gmp-packing-pest-control-inspection-flytrap-area-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-flytrap-area-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-area-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionFlytrapAreaInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryArea

  constructor(inventoryService: GMPPackingPestControlInspectionFlytrapAreaInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}