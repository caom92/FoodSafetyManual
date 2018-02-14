import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula/components/dragula.provider'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryComponent } from '../../super-inventory/super.inventory'
import { InventoryItem, InventoryType } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { AreaManagerService } from '../../../../services/app.area.manager'

@Component({
  selector: 'gmp-packing-glass-brittle-inventory',
  templateUrl: './gmp.packing.glass.brittle.inventory.html'
})

export class GMPPackingGlassBrittleInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryType> = []
  public type_array: Array<{ id: number, es: string, en: string }> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, dragulaService, areaManagerService)
  }


  public ngOnInit(): void {
    this.setSuffix("gmp-packing-glass-brittle")
    super.ngOnInit()
  }

  public loadAreaInventory(event: any) {
    super.loadAreaInventory(event)
    console.log(this.selectedArea)
  }

  /*public addItem(): void {
    let type_array: Array<{ id: number, en: string, es: string }> = []
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, en: temp.en, es: temp.es })
    }
    super.addItem(GMPPackingGlassBrittleAddItemComponent, { type_array: type_array, area_id: this.selectedArea }, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
      this.emptyInventoryFlag = false
    })
  }*/

  public onInventoryUpdate(): void {

  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}