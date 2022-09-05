import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryService } from '../services/gap-packing-pest-control-inspection-exterior-corrective-action-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryCorrectiveAction } from '../interfaces/gap-packing-pest-control-inspection-exterior-corrective-action-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-exterior-corrective-action-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-exterior-corrective-action-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryCorrectiveAction

  constructor(inventoryService: GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}