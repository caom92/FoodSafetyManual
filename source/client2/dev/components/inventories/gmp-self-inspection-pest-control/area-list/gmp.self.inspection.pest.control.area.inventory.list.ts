import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list'
import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'

@Component({
  selector: '[gmp-self-inspection-pest-control-area-inventory-list]',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.list.html'
})

export class GMPSelfInspectionPestControlAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService, events: PubSubService, areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-self-inspection-pest-control-area-bag')
    this.setSuffix('gmp-self-inspection-pest-control')
    super.ngOnInit()
  }

  public getCurrentInventory(): Array<InventoryArea> {
    return this.areas
  }
}