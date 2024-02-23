import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService } from '../services/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryCorrectiveAction } from '../interfaces/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory-list]',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory-list.component.html'
})

export class GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryCorrectiveAction>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService) {
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

  public getCurrentInventory(): Array<InventoryCorrectiveAction> {
    return this.items
  }
}