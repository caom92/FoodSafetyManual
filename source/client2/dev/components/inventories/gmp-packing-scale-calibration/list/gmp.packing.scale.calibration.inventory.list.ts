import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'
import { InventoryType, InventoryItem } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

@Component({
  selector: '[gmp-packing-scale-calibration-inventory-list]',
  templateUrl: './gmp.packing.scale.calibration.inventory.list.html'
})

export class GMPPackingScaleCalibrationInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy {
  @Language() lang: string
  @Input() type: InventoryType

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setBagName(this.type.name)
    this.setSuffix('gmp-packing-scale-calibration')
    super.ngOnInit()
  }

  public onItemAdd(item: any): void {
    if (item.type == this.type.id) {
      item.item.position = this.getCurrentInventory().length + 1
      this.getCurrentInventory().push(item.item)
    }
  }

  public getCurrentInventory(): Array<InventoryItem> {
    return this.type.items
  }
}