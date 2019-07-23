import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gap.packing.preop.inventory.interface'

@Component({
  selector: '[gap-packing-preop-inventory-item]',
  templateUrl: './gap.packing.preop.inventory.item.html'
})

export class GAPPackingPreopInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: { en: string, es: string } = null
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-preop')
    this.setToggleValue(this.item.is_active == 1)
  }
}