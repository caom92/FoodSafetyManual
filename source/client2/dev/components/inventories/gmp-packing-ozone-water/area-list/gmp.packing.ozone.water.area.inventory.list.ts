import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaInventoryService } from '../../../../services/area-inventory.service'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list'
import { InventoryArea } from '../interfaces/gmp.packing.ozone.water.area.inventory.interface'

@Component({
  selector: '[gmp-packing-ozone-water-area-inventory-list]',
  templateUrl: './gmp.packing.ozone.water.area.inventory.list.html'
})

export class GMPPackingOzoneWaterAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService, events: PubSubService, areaInventoryService: AreaInventoryService) {
    super(dragulaService, events, areaInventoryService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-packing-ozone-water-area-bag')
    this.setSuffix('gmp-packing-ozone-water')
    super.ngOnInit()
  }

  public getCurrentInventory(): Array<InventoryArea> {
    return this.areas
  }
}