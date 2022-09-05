import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-protection-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryProtectionStatus } from '../interfaces/gap-packing-pest-control-inspection-flytrap-protection-status-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-flytrap-protection-status-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-protection-status-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryProtectionStatus

  constructor(inventoryService: GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}