import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.packing.preop.inventory.interface'

@Component({
  selector: '[gmp-packing-preop-inventory-item]',
  templateUrl: './gmp.packing.preop.inventory.item.html'
})

export class GMPPackingPreopInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: { en: string, es: string } = null
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-preop')
    this.setToggleValue(this.item.is_active == 1)
  }
}