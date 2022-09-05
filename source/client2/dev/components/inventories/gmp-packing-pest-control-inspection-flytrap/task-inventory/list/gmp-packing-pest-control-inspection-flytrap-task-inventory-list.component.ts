import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionFlytrapTaskInventoryService } from '../services/gmp-packing-pest-control-inspection-flytrap-task-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryTask } from '../interfaces/gmp-packing-pest-control-inspection-flytrap-task-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-flytrap-task-inventory-list]',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-task-inventory-list.component.html'
})

export class GMPPackingPestControlInspectionFlytrapTaskInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryTask>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GMPPackingPestControlInspectionFlytrapTaskInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-flytrap')
    this.setBagName(this.suffix + '-bag')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.getCurrentInventory().length + 1
    this.getCurrentInventory().push(item.item)
  }

  public getCurrentInventory(): Array<InventoryTask> {
    return this.items
  }
}