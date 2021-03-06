import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula/components/dragula.provider'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryComponent } from '../../super-inventory/super.inventory'
import { InventoryType } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-inventory',
  templateUrl: './gmp.packing.scale.calibration.inventory.html'
})

export class GMPPackingScaleCalibrationInventoryComponent extends SuperInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryType> = []
  public type_array: Array<{ id: number, name: string }> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService) {
    super(events, inventoryService, dragulaService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-scale-calibration")
    super.ngOnInit()
  }
   
  public onInventoryUpdate(): void {
    this.type_array = []
    
    for (let temp of this.inventory) {
      this.type_array.push({ id: temp.id, name: temp.name })
    }
  }

  public checkEmptyInventory(): boolean {
    let emptyCount = 0
    for (let type of this.inventory) {
      if (type.items.length == 0) {
        emptyCount++
      }
    }

    if (emptyCount == this.inventory.length) {
      this.emptyInventoryFlag = true
      return true
    } else {
      this.emptyInventoryFlag = false
      return false
    }
  }
}