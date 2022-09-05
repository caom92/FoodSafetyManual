import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionExteriorPestTypeInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-pest-type-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryPestType } from '../interfaces/gmp-packing-pest-control-inspection-exterior-pest-type-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-exterior-pest-type-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-pest-type-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionExteriorPestTypeInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryPestType

  constructor(inventoryService: GMPPackingPestControlInspectionExteriorPestTypeInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}