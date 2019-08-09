import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaInventoryService } from '../../../../services/area-inventory.service'
import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory',
  templateUrl: './gmp.self.inspection.pest.control.inventory.html'
})

export class GMPSelfInspectionPestControlInventoryComponent extends SuperInventoryByAreaComponent {
  @Language() lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService,
    areaInventoryService: AreaInventoryService) {
    super(events, inventoryService, dragulaService, areaInventoryService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-self-inspection-pest-control-bag')
    this.setSuffix('gmp-self-inspection-pest-control')
    super.ngOnInit()
  }

  public onInventoryUpdate(): void {
    
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}