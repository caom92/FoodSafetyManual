import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionFlytrapAreaInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-area-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryArea } from '../interfaces/gap-packing-pest-control-inspection-flytrap-area-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-flytrap-area-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-area-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionFlytrapAreaInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryArea

  constructor(inventoryService: GAPPackingPestControlInspectionFlytrapAreaInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}