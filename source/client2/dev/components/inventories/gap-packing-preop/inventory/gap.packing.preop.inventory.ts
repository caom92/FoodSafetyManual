import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { AreaInventoryService } from '../../../../services/area-inventory.service'
import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryType } from '../interfaces/gap.packing.preop.inventory.interface'

@Component({
  selector: 'gap-packing-preop-inventory',
  templateUrl: './gap.packing.preop.inventory.html'
})

export class GAPPackingPreopInventoryComponent extends SuperInventoryByAreaComponent {
  @Input() inventory: Array<InventoryType> = []
  public type_array: Array<{ id: number, es: string, en: string }> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService,
    areaInventoryService: AreaInventoryService) {
    super(events, inventoryService, dragulaService, areaInventoryService)
  }


  public ngOnInit(): void {
    this.setSuffix('gap-packing-preop')
    super.ngOnInit()
  }

  public loadAreaInventory(event: any) {
    super.loadAreaInventory(event)
  }

  /*public addItem(): void {
    let type_array: Array<{ id: number, en: string, es: string }> = []
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, en: temp.en, es: temp.es })
    }
    super.addItem(GAPPackingPreopAddItemComponent, { type_array: type_array, area_id: this.selectedArea }, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
      this.emptyInventoryFlag = false
    })
  }*/

  public onInventoryUpdate(): void {
    this.type_array = []
    
    for (let temp of this.inventory) {
      this.type_array.push({ id: temp.id, es: temp.es, en: temp.en })
    }
  }

  public checkEmptyInventory(): boolean {
    let emptyCount = 0

    for (let type of this.inventory) {
      if (type.inventory.length == 0) {
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

  public initDragula(): void {
    for (let type of this.inventory) {
      this.addGroup(type.en)
    }
  }
}