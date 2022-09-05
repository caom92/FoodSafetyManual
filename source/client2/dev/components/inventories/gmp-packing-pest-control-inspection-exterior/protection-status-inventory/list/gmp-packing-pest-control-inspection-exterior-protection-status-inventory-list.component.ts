import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionExteriorProtectionStatusInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-protection-status-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryProtectionStatus } from '../interfaces/gmp-packing-pest-control-inspection-exterior-protection-status-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-exterior-protection-status-inventory-list]',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-protection-status-inventory-list.component.html'
})

export class GMPPackingPestControlInspectionExteriorProtectionStatusInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryProtectionStatus>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GMPPackingPestControlInspectionExteriorProtectionStatusInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    this.setBagName(this.suffix + '-bag')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    item.item.position = this.getCurrentInventory().length + 1
    this.getCurrentInventory().push(item.item)
  }

  public getCurrentInventory(): Array<InventoryProtectionStatus> {
    return this.items
  }
}