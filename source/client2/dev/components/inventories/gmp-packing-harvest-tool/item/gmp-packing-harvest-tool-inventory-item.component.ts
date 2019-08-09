import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp-packing-harvest-tool-inventory.interface'

@Component({
  selector: '[gmp-packing-harvest-tool-inventory-item]',
  templateUrl: './gmp-packing-harvest-tool-inventory-item.component.html'
})

export class GMPPackingHarvestToolInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryItem

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-harvest-tool')
    this.setToggleValue(this.item.is_active == 1)
  }
}