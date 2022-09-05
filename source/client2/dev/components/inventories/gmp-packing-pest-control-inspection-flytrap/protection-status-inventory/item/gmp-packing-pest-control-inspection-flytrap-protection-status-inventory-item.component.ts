import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryProtectionStatus } from '../interfaces/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-flytrap-protection-status-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-protection-status-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryProtectionStatus

  constructor(inventoryService: GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}