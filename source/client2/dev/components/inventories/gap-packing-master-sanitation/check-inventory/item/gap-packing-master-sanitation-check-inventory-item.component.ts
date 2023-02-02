import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingMasterSanitationCheckInventoryService } from '../services/gap-packing-master-sanitation-check-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryCheck } from '../interfaces/gap-packing-master-sanitation-check-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-check-inventory-item]',
  templateUrl: './gap-packing-master-sanitation-check-inventory-item.component.html'
})

export class GAPPackingMasterSanitationCheckInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() type: { name: string } = null
  @Input() item: InventoryCheck

  constructor(inventoryService: GAPPackingMasterSanitationCheckInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
    this.setToggleValue(this.item.is_active == 1)
  }
}
