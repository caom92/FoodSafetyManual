import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list'
import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-area-inventory-list',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPSelfInspectionPestControlAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService, events: Events, areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName("gmp-self-inspection-pest-control-area-bag")
    this.setSuffix("gmp-self-inspection-pest-control")
    this.setInventory(this.areas)
    super.ngOnInit()
  }

  public ngOnChanges(): void {
    this.setInventory(this.areas)
    this.setOriginalInventory(this.areas)
  }
}