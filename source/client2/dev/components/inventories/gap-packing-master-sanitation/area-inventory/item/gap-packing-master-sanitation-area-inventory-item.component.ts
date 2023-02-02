import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingMasterSanitationAreaInventoryService } from '../services/gap-packing-master-sanitation-area-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryArea } from '../interfaces/gap-packing-master-sanitation-area-inventory.interface'

@Component({
  selector: '[gap-packing-master-sanitation-area-inventory-item]',
  templateUrl: './gap-packing-master-sanitation-area-inventory-item.component.html'
})

export class GAPPackingMasterSanitationAreaInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryArea

  constructor(inventoryService: GAPPackingMasterSanitationAreaInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
    this.setToggleValue(this.item.is_active == 1)
  }
}