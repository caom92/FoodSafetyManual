import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.packing.hand.washing.inventory.interface'

@Component({
  selector: '[gmp-packing-hand-washing-inventory-item]',
  templateUrl: './gmp.packing.hand.washing.inventory.item.html'
})

export class GMPPackingHandWashingInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() type: string = ''
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-hand-washing')
    this.setToggleValue(this.item.is_active == 1)
  }
}