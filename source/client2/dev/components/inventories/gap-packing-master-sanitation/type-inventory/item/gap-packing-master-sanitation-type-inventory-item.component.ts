import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingMasterSanitationTypeInventoryService } from '../services/gap-packing-master-sanitation-type-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryType } from '../interfaces/gap-packing-master-sanitation-type-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-type-inventory-item]',
  templateUrl: './gap-packing-master-sanitation-type-inventory-item.component.html'
})

export class GAPPackingMasterSanitationTypeInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryType

  constructor(inventoryService: GAPPackingMasterSanitationTypeInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
    this.setToggleValue(this.item.is_active == 1)
  }
}
