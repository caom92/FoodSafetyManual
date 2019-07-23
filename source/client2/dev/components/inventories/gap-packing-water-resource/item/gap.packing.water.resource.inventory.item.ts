import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gap.packing.water.resource.inventory.interface'

@Component({
  selector: '[gap-packing-water-resource-inventory-item]',
  templateUrl: './gap.packing.water.resource.inventory.item.html'
})

export class GAPPackingWaterResourceInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-water-resource')
    this.setToggleValue(this.item.is_active == 1)
  }
}