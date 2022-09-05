import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-pest-type-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryPestType } from '../interfaces/gap-packing-pest-control-inspection-flytrap-pest-type-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-flytrap-pest-type-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-pest-type-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionFlytrapPestTypeInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryPestType

  constructor(inventoryService: GAPPackingPestControlInspectionFlytrapPestTypeInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}