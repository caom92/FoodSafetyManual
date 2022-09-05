import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionInteriorAreaInventoryService } from '../services/gmp-packing-pest-control-inspection-interior-area-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryArea } from '../interfaces/gmp-packing-pest-control-inspection-interior-area-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-interior-area-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-interior-area-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionInteriorAreaInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryArea

  constructor(inventoryService: GMPPackingPestControlInspectionInteriorAreaInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}