import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-item',
  templateUrl: './gmp.self.inspection.pest.control.inventory.item.html'
})

export class GMPSelfInspectionPestControlInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-self-inspection-pest-control")
    this.setToggleValue(this.item.is_active == 1)
  }
}