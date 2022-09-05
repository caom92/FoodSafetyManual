import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GAPPackingPestControlInspectionInteriorPestTypeInventoryService } from '../services/gap-packing-pest-control-inspection-interior-pest-type-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryPestType } from '../interfaces/gap-packing-pest-control-inspection-interior-pest-type-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-interior-pest-type-inventory-list]',
  templateUrl: './gap-packing-pest-control-inspection-interior-pest-type-inventory-list.component.html'
})

export class GAPPackingPestControlInspectionInteriorPestTypeInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryPestType>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GAPPackingPestControlInspectionInteriorPestTypeInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setBagName(this.suffix + '-bag')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.getCurrentInventory().length + 1
    this.getCurrentInventory().push(item.item)
  }

  public getCurrentInventory(): Array<InventoryPestType> {
    return this.items
  }
}