import { Component, Input, OnInit } from '@angular/core'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gmp.doc.control.doc.control.inventory.interface'

@Component({
  selector: '[gmp-doc-control-doc-control-inventory-item]',
  templateUrl: './gmp.doc.control.doc.control.inventory.item.html'
})

export class GMPDocControlDocControlInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: string = ''
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-doc-control-doc-control')
    this.setToggleValue(this.item.is_active == 1)
  }
}