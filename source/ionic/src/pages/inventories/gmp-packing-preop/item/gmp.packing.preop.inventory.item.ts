import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.packing.preop.inventory.interface'
import { Language } from 'angular-l10n'

@Component({
  selector: 'gmp-packing-preop-inventory-item',
  templateUrl: './gmp.packing.preop.inventory.item.html'
})

export class GMPPackingPreopInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() private type: {en: string, es: string} = null
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    console.log(this.item)
    this.setSuffix("gmp-packing-preop")
    this.setToggleValue(this.item.is_active == 1)
  }
}