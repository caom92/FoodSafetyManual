import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryItem } from '../interfaces/gmp-packing-bathroom-cleaning-inventory.interface'

@Component({
  selector: '[gmp-packing-bathroom-cleaning-inventory-list]',
  templateUrl: './gmp-packing-bathroom-cleaning-inventory-list.component.html'
})

export class GMPPackingBathroomCleaningInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryItem>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-bathroom-cleaning')
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