import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'

//import { ISubscription } from 'rxjs/Subscription'

import { Language } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'

import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'

@Component({
  selector: 'gmp-packing-scissors-knives-inventory-list',
  templateUrl: './gmp.packing.scissors.knives.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingScissorsKnivesInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() private items: Array<InventoryItem>
  //private drag: ISubscription = null
  //private dragend: ISubscription = null
  //private originalInventory = null

  constructor(private dragulaService: DragulaService, public events: Events, public server: BackendService) {
    
  }

  ngOnInit(){
    /*
    this.dragulaService.setOptions("scissors-knives-bag", {
      moves: function (el, container, handle) {
        return (handle.classList.contains('handle'))
      },
      revertOnSpill: true
    })

    this.dragulaService.drag.subscribe((value) => {
      this.events.publish("scroll:stop", "Scroll Stopped")
    })

    this.dragulaService.dragend.subscribe((value) => {
      this.events.publish("scroll:start", "Scroll Started")
      let index = 1
      for(let item in this.items){
        this.items[item].order = index++
        let reorderForm = new FormData()
        reorderForm.append("item_id", "" + this.items[item].id)
        reorderForm.append("position", "" + this.items[item].order)
        this.server.update(
          'reorder-gmp-packing-scissors-knives',
          reorderForm,
          (response: any) => {
            console.log("Item reordered")
          }
        )
      }
    })
    */
  }

  ngOnDestroy(){
    /*
    if (this.dragulaService.find("scissors-knives-bag") !== undefined){
      console.warn("Dragula bag " + "scissors-knives-bag" + " destroyed")
      this.dragulaService.drag.unsubscribe()
      this.dragulaService.dragend.unsubscribe()
      this.dragulaService.destroy("scissors-knives-bag")
    } else {
      console.error("No Dragula bag present on gmp-packing-scissors-knives Inventory")
    }
    */
  }
}