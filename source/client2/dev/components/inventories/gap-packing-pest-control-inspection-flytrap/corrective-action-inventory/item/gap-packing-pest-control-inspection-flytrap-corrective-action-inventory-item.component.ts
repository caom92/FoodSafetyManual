import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryCorrectiveAction } from '../interfaces/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-flytrap-corrective-action-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-corrective-action-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryCorrectiveAction

  constructor(inventoryService: GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}