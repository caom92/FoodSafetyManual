import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { GMPPackingPreopAddItemComponent } from '../add-item/gmp.packing.preop.add.item'
import { InventoryItem, InventoryType } from '../interfaces/gmp.packing.preop.inventory.interface'

@Component({
  selector: 'gmp-packing-preop-inventory',
  templateUrl: './gmp.packing.preop.inventory.html'
})

export class GMPPackingPreopInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryType> = []

  constructor(events: Events,
    inventoryService: InventoryService,
    modalController: ModalController,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, modalController, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-preop")
    super.ngOnInit()
  }

  public addItem(): void {
    let type_array: Array<{ id: number, en: string, es: string }> = []
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, en: temp.en, es: temp.es })
    }
    super.addItem(GMPPackingPreopAddItemComponent, { type_array: type_array, area_id: this.selectedArea }, (data) => {
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