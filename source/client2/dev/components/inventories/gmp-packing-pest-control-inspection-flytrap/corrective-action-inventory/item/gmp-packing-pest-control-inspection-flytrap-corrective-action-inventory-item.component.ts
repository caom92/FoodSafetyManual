import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService } from '../services/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryCorrectiveAction } from '../interfaces/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryCorrectiveAction

  constructor(inventoryService: GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}