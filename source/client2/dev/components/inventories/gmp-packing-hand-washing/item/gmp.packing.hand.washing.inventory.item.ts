import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.packing.hand.washing.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

@Component({
  selector: '[gmp-packing-hand-washing-inventory-item]',
  templateUrl: './gmp.packing.hand.washing.inventory.item.html'
})

export class GMPPackingHandWashingInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: string = ""
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-hand-washing")
    this.setToggleValue(this.item.is_active == 1)
  }
}