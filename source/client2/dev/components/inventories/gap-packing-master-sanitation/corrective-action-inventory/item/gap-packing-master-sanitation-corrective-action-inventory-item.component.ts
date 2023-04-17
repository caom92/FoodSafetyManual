import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingMasterSanitationCorrectiveActionInventoryService } from '../services/gap-packing-master-sanitation-corrective-action-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryCorrectiveAction } from '../interfaces/gap-packing-master-sanitation-corrective-action-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-corrective-action-inventory-item]',
  templateUrl: './gap-packing-master-sanitation-corrective-action-inventory-item.component.html'
})

export class GAPPackingMasterSanitationCorrectiveActionInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryCorrectiveAction

  constructor(inventoryService: GAPPackingMasterSanitationCorrectiveActionInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
    this.setToggleValue(this.item.is_active == 1)
  }
}
