import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingCoolerCleaningAreaInventoryService } from '../services/gap-packing-cooler-cleaning-area-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryArea } from '../interfaces/gap-packing-cooler-cleaning-area-inventory.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-area-inventory-item]',
  templateUrl: './gap-packing-cooler-cleaning-area-inventory-item.component.html'
})

export class GAPPackingCoolerCleaningAreaInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryArea

  constructor(inventoryService: GAPPackingCoolerCleaningAreaInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
    this.setToggleValue(this.item.is_active == 1)
  }
}