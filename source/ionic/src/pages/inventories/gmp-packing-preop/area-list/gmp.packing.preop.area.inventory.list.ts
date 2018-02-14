import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list'
import { InventoryArea } from '../interfaces/gmp.packing.preop.area.inventory.interface'

@Component({
  selector: 'gmp-packing-preop-area-inventory-list',
  templateUrl: './gmp.packing.preop.area.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingPreopAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService, events: Events, areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName("gmp-packing-preop-area-bag")
    this.setSuffix("gmp-packing-preop")
    this.setInventory(this.areas)
    super.ngOnInit()
  }

  public ngOnChanges(): void {
    this.setInventory(this.areas)
    this.setOriginalInventory(this.areas)
  }
}