import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp.packing.atp.luminometer.inventory.interface'

@Component({
  selector: '[gmp-packing-atp-luminometer-inventory-list]',
  templateUrl: './gmp.packing.atp.luminometer.inventory.list.html'
})

export class GMPPackingATPLuminometerInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() items: Array<InventoryItem>
  @Input() private printHeader: boolean = false

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-atp-luminometer')
    this.setBagName(this.suffix + '-bag')
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
