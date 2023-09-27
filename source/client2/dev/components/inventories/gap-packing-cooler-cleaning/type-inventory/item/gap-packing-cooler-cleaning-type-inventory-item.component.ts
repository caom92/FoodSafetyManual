import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingCoolerCleaningTypeInventoryService } from '../services/gap-packing-cooler-cleaning-type-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryType } from '../interfaces/gap-packing-cooler-cleaning-type-inventory.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-type-inventory-item]',
  templateUrl: './gap-packing-cooler-cleaning-type-inventory-item.component.html'
})

export class GAPPackingCoolerCleaningTypeInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryType

  constructor(inventoryService: GAPPackingCoolerCleaningTypeInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
    this.setToggleValue(this.item.is_active == 1)
  }
}
