import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.packing.cold.room.temp.inventory.interface'

@Component({
  selector: '[gmp-packing-cold-room-temp-inventory-item]',
  templateUrl: './gmp.packing.cold.room.temp.inventory.item.html'
})

export class GMPPackingColdRoomTempInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: string = ''
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-cold-room-temp')
    this.setToggleValue(this.item.is_active == 1)
  }
}