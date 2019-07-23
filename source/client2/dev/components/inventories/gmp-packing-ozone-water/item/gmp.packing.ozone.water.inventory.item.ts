import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.packing.ozone.water.inventory.interface'

@Component({
  selector: '[gmp-packing-ozone-water-inventory-item]',
  templateUrl: './gmp.packing.ozone.water.inventory.item.html'
})

export class GMPPackingOzoneWaterInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-ozone-water')
    this.setToggleValue(this.item.is_active == 1)
  }
}