import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.doc.control.doc.control.inventory.interface'

@Component({
  selector: '[gmp-doc-control-doc-control-inventory-list]',
  templateUrl: './gmp.doc.control.doc.control.inventory.list.html'
})

export class GMPDocControlDocControlInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() items: Array<InventoryItem>
  @Input() private printHeader: boolean = false

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-doc-control-doc-control-bag')
    this.setSuffix('gmp-doc-control-doc-control')
    this.setInventory(this.items)
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.currentInventory.length + 1
    this.currentInventory.push(item.item)
    this.originalInventory.push(item.item)
  }

  public ngOnChanges(): void{
    this.setInventory(this.items)
    this.setOriginalInventory(this.items)
  }
}