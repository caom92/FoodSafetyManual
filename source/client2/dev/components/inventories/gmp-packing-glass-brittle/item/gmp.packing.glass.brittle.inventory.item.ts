import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'

@Component({
  selector: '[gmp-packing-glass-brittle-inventory-item]',
  templateUrl: './gmp.packing.glass.brittle.inventory.item.html'
})

export class GMPPackingGlassBrittleInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-glass-brittle')
    this.setToggleValue(this.item.is_active == 1)
  }
}