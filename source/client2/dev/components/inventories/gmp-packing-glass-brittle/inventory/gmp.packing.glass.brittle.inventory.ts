import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryItem } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-inventory',
  templateUrl: './gmp.packing.glass.brittle.inventory.html'
})

export class GMPPackingGlassBrittleInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, dragulaService, areaManagerService)
  }

  public ngOnInit(): void {
    this.setBagName('gmp-packing-glass-brittle-bag')
    this.setSuffix('gmp-packing-glass-brittle')
    super.ngOnInit()
  }

  public onInventoryUpdate(): void {
    // Se debe reimplmentar para evitar que se lance la excepción
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}