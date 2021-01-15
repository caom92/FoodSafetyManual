import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp-packing-bathroom-cleaning-inventory.interface'

@Component({
  selector: '[gmp-packing-bathroom-cleaning-inventory-item]',
  templateUrl: './gmp-packing-bathroom-cleaning-inventory-item.component.html'
})

export class GMPPackingBathroomCleaningInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryItem

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-bathroom-cleaning')
    this.setToggleValue(this.item.is_active == 1)
  }
}