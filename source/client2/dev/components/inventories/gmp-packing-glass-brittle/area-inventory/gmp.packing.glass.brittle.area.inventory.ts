import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
//import { GMPPackingGlassBrittleAddAreaComponent } from '../add-area/gmp.packing.glass.brittle.add.area'
import { InventoryArea } from '../interfaces/gmp.packing.glass.brittle.area.inventory.interface'
import { PubSubService } from 'angular2-pubsub'

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

  /*public addArea(): void {
    super.addArea(GMPPackingGlassBrittleAddAreaComponent, null, (data) => {
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