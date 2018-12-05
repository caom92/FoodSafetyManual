import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list'
import { InventoryArea } from '../interfaces/gmp.packing.glass.brittle.area.inventory.interface'

@Component({
  selector: '[gmp-packing-glass-brittle-area-inventory-list]',
  templateUrl: './gmp.packing.glass.brittle.area.inventory.list.html'
})

export class GMPPackingGlassBrittleAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService, events: PubSubService, areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-packing-glass-brittle-area-bag')
    this.setSuffix('gmp-packing-glass-brittle')
    super.ngOnInit()
  }

  public getCurrentInventory(): Array<InventoryArea> {
    return this.areas
  }
}