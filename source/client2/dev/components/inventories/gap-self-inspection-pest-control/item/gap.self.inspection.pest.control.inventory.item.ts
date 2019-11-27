import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gap.self.inspection.pest.control.inventory.interface'

@Component({
  selector: '[gap-self-inspection-pest-control-inventory-item]',
  templateUrl: './gap.self.inspection.pest.control.inventory.item.html'
})

export class GAPSelfInspectionPestControlInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryItem

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-self-inspection-pest-control')
    this.setToggleValue(this.item.is_active == 1)
  }
}