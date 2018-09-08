import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
import { InventoryArea } from '../interfaces/gmp.packing.preop.area.inventory.interface'

//import { GMPPackingPreopAddAreaComponent } from '../add-area/gmp.packing.preop.add.area'
@Component({
  selector: 'gmp-packing-preop-area-inventory',
  templateUrl: './gmp.packing.preop.area.inventory.html'
})

export class GMPPackingPreopAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(dragulaService: DragulaService, events: PubSubService, areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-preop')
    this.setBagName(this.suffix + '-area-bag')
    super.ngOnInit()
  }

  /*public addArea(): void {
    super.addArea(GMPPackingPreopAddAreaComponent, null, (data) => {
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