import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionInteriorPestTypeInventoryService } from '../services/gmp-packing-pest-control-inspection-interior-pest-type-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryPestType } from '../interfaces/gmp-packing-pest-control-inspection-interior-pest-type-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-interior-pest-type-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-interior-pest-type-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionInteriorPestTypeInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryPestType

  constructor(inventoryService: GMPPackingPestControlInspectionInteriorPestTypeInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}