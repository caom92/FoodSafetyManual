import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'

@Component({
  selector: '[gmp-self-inspection-pest-control-inventory-item]',
  templateUrl: './gmp.self.inspection.pest.control.inventory.item.html'
})

export class GMPSelfInspectionPestControlInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    console.log(this.item)
    this.setSuffix("gmp-self-inspection-pest-control")
    this.setToggleValue(this.item.is_active == 1)
  }
}