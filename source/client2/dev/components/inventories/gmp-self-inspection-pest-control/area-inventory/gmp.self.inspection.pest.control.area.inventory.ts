import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-area-inventory',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.html'
})

export class GMPSelfInspectionPestControlAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(events: PubSubService, areaManagerService: AreaManagerService) {
    super(events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-self-inspection-pest-control-area-bag')
    this.setSuffix('gmp-self-inspection-pest-control')
    super.ngOnInit()
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}