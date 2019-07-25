import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp-packing-harvest-tool-inventory.interface'

@Component({
  selector: '[gmp-packing-harvest-tool-inventory-item]',
  templateUrl: './gmp-packing-harvest-tool-inventory-item.component.html'
})

export class GMPPackingHarvestToolInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-harvest-tool')
    this.setToggleValue(this.item.is_active == 1)
  }
}