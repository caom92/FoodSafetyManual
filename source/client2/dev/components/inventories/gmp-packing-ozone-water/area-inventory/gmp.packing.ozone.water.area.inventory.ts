import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
import { InventoryArea } from '../interfaces/gmp.packing.ozone.water.area.inventory.interface'

@Component({
  selector: 'gmp-packing-ozone-water-area-inventory',
  templateUrl: './gmp.packing.ozone.water.area.inventory.html'
})

export class GMPPackingOzoneWaterAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(events: PubSubService, areaManagerService: AreaManagerService) {
    super(events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-packing-ozone-water-area-bag')
    this.setSuffix('gmp-packing-ozone-water')
    super.ngOnInit()
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}