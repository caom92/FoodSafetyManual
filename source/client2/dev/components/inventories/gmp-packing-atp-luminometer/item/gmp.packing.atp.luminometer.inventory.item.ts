import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.packing.atp.luminometer.inventory.interface'

@Component({
  selector: '[gmp-packing-atp-luminometer-inventory-item]',
  templateUrl: './gmp.packing.atp.luminometer.inventory.item.html'
})

export class GMPPackingATPLuminometerInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: string = ''
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-atp-luminometer')
    this.setToggleValue(this.item.is_active == 1)
  }
}