import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

@Component({
  selector: 'gmp-packing-scissors-knives-inventory-item',
  templateUrl: './gmp.packing.scissors.knives.inventory.item.html'
})

export class GMPPackingScissorsKnivesInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: string = ""
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-scissors-knives")
    this.setToggleValue(this.item.is_active == 1)
  }
}