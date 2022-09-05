import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionExteriorPestTypeInventoryService } from '../services/gap-packing-pest-control-inspection-exterior-pest-type-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryPestType } from '../interfaces/gap-packing-pest-control-inspection-exterior-pest-type-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-exterior-pest-type-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-exterior-pest-type-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionExteriorPestTypeInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryPestType

  constructor(inventoryService: GAPPackingPestControlInspectionExteriorPestTypeInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}