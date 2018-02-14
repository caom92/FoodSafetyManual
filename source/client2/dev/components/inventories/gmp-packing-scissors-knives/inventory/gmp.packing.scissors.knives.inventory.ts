import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula/components/dragula.provider'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryComponent } from '../../super-inventory/super.inventory'
import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'

@Component({
  selector: 'gmp-packing-scissors-knives-inventory',
  templateUrl: './gmp.packing.scissors.knives.inventory.html'
})

export class GMPPackingScissorsKnivesInventoryComponent extends SuperInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService) {
    super(events, inventoryService, dragulaService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-scissors-knives")
    super.ngOnInit()
  }

  public onInventoryUpdate(): void {
    // Se debe reimplmentar para evitar que se lance la excepción
  }

  /*public addItem(): void {
    super.addItem(GMPPackingScissorsKnivesAddItemComponent, null, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
    })
  }*/

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}