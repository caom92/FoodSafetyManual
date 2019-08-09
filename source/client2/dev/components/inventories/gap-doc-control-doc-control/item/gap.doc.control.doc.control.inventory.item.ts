import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryItem } from '../interfaces/gap.doc.control.doc.control.inventory.interface'

@Component({
  selector: '[gap-doc-control-doc-control-inventory-item]',
  templateUrl: './gap.doc.control.doc.control.inventory.item.html'
})

export class GAPDocControlDocControlInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() type: string = ''
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-doc-control-doc-control')
    this.setToggleValue(this.item.is_active == 1)
  }
}