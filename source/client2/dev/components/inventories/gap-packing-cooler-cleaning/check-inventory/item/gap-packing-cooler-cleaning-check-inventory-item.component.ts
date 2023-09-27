import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingCoolerCleaningCheckInventoryService } from '../services/gap-packing-cooler-cleaning-check-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryCheck } from '../interfaces/gap-packing-cooler-cleaning-check-inventory.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-check-inventory-item]',
  templateUrl: './gap-packing-cooler-cleaning-check-inventory-item.component.html'
})

export class GAPPackingCoolerCleaningCheckInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() type: { name: string } = null
  @Input() item: InventoryCheck

  constructor(inventoryService: GAPPackingCoolerCleaningCheckInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
    this.setToggleValue(this.item.is_active == 1)
  }
}
