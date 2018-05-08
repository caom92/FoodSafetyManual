import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.packing.ozone.water.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

@Component({
  selector: '[gmp-packing-ozone-water-inventory-item]',
  templateUrl: './gmp.packing.ozone.water.inventory.item.html'
})

export class GMPPackingOzoneWaterInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-ozone-water")
    this.setToggleValue(this.item.is_active == 1)
  }
}