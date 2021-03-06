import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
//import { GAPPackingPreopAddAreaComponent } from '../add-area/gap.packing.preop.add.area'
import { InventoryArea } from '../interfaces/gap.packing.preop.area.inventory.interface'
import { PubSubService } from 'angular2-pubsub'

@Component({
  selector: 'gap-packing-preop-area-inventory',
  templateUrl: './gap.packing.preop.area.inventory.html'
})

export class GAPPackingPreopAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(events: PubSubService, areaManagerService: AreaManagerService) {
    super(events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gap-packing-preop")
    super.ngOnInit()
  }

  /*public addArea(): void {
    super.addArea(GAPPackingPreopAddAreaComponent, null, (data) => {
      data.area.position = this.inventory.length + 1
      this.inventory.push(data.area)
      this.emptyInventoryFlag = false
    })
  }*/

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}