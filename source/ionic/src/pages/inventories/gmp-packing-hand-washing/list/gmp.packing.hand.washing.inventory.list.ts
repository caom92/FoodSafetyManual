import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.hand.washing.inventory.interface'

import { DragulaService } from 'ng2-dragula'

import { BackendService } from '../../../../services/app.backend'

@Component({
  selector: 'gmp-packing-hand-washing-inventory-list',
  templateUrl: './gmp.packing.hand.washing.inventory.list.html'
})

export class GMPPackingHandWashingInventoryListComponent implements OnInit, OnDestroy {
  @Language()
  lang: string

  @Input()
  items: Array<InventoryItem>

  constructor(private dragulaService: DragulaService, public events: Events, public server: BackendService) {
    
  }

  ngOnInit(){
    /*
    this.dragulaService.setOptions("hand-washing-bag", {
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
          'reorder-gmp-packing-hand-washing',
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
    if (this.dragulaService.find("hand-washing-bag") !== undefined){
      console.warn("Dragula bag " + "hand-washing-bag" + " destroyed")
      this.dragulaService.drag.unsubscribe()
      this.dragulaService.dragend.unsubscribe()
      this.dragulaService.destroy("hand-washing-bag")
    } else {
      console.error("No Dragula bag present on gmp-packing-hand-washing Inventory")
    }
    */
  }
}