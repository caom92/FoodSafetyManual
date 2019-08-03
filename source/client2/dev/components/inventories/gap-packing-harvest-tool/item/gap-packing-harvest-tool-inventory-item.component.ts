import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gap-packing-harvest-tool-inventory.interface'

@Component({
  selector: '[gap-packing-harvest-tool-inventory-item]',
  templateUrl: './gap-packing-harvest-tool-inventory-item.component.html'
})

export class GAPPackingHarvestToolInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-harvest-tool')
    this.setToggleValue(this.item.is_active == 1)
  }
}