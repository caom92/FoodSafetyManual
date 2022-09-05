import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryService } from '../services/gap-packing-pest-control-inspection-interior-corrective-action-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryCorrectiveAction } from '../interfaces/gap-packing-pest-control-inspection-interior-corrective-action-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-interior-corrective-action-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-interior-corrective-action-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryCorrectiveAction

  constructor(inventoryService: GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}