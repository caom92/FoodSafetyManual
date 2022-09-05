import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { DragulaService } from 'ng2-dragula'

import { GMPPackingPestControlInspectionExteriorAreaInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-area-inventory.service'
import { SuperInventoryListComponent } from '../../../super-inventory/super.inventory.list'
import { InventoryArea } from '../interfaces/gmp-packing-pest-control-inspection-exterior-area-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-exterior-area-inventory-list]',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-area-inventory-list.component.html'
})

export class GMPPackingPestControlInspectionExteriorAreaInventoryListComponent extends SuperInventoryListComponent {
  @Language() lang: string
  @Input() items: Array<InventoryArea>

  constructor(dragulaService: DragulaService, events: PubSubService, inventoryService: GMPPackingPestControlInspectionExteriorAreaInventoryService) {
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

  public getCurrentInventory(): Array<InventoryArea> {
    return this.items
  }
}