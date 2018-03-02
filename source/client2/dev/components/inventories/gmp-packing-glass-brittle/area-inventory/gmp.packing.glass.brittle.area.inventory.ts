import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
import { InventoryArea } from '../interfaces/gmp.packing.glass.brittle.area.inventory.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-area-inventory',
  templateUrl: './gmp.packing.glass.brittle.area.inventory.html'
})

export class GMPPackingGlassBrittleAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(events: PubSubService, areaManagerService: AreaManagerService) {
    super(events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-glass-brittle")
    super.ngOnInit()
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}