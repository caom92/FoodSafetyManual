import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { GAPPackingPreopAddItemComponent } from '../add-item/gap.packing.preop.add.item'
import { InventoryItem, InventoryType } from '../interfaces/gap.packing.preop.inventory.interface'

@Component({
  selector: 'gap-packing-preop-inventory',
  templateUrl: './gap.packing.preop.inventory.html'
})

export class GAPPackingPreopInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryType> = []

  constructor(events: Events,
    inventoryService: InventoryService,
    modalController: ModalController,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, modalController, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gap-packing-preop")
    super.ngOnInit()
  }

  public addItem(): void {
    let type_array: Array<{ id: number, en: string, es: string }> = []
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, en: temp.en, es: temp.es })
    }
    super.addItem(GAPPackingPreopAddItemComponent, { type_array: type_array, area_id: this.selectedArea }, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
      this.emptyInventoryFlag = false
    })
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
}