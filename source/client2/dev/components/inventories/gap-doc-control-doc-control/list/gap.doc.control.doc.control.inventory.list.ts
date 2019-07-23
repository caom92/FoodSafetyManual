import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gap.doc.control.doc.control.inventory.interface'

@Component({
  selector: '[gap-doc-control-doc-control-inventory-list]',
  templateUrl: './gap.doc.control.doc.control.inventory.list.html'
})

export class GAPDocControlDocControlInventoryListComponent extends SuperInventoryListComponent {
  @Input() items: Array<InventoryItem>

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName('gap-doc-control-doc-control-bag')
    this.setSuffix('gap-doc-control-doc-control')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.getCurrentInventory().length + 1
    this.getCurrentInventory().push(item.item)
  }

  public getCurrentInventory(): Array<InventoryItem> {
    return this.items
  }
}