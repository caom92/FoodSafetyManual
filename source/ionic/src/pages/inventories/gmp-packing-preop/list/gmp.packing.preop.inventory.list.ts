import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events } from 'ionic-angular'
import { DragulaService } from 'ng2-dragula'
import { ISubscription } from 'rxjs/Subscription'

import { BackendService } from '../../../../services/app.backend'
import { InventoryType } from '../interfaces/gmp.packing.preop.inventory.interface'

@Component({
  selector: 'gmp-packing-preop-inventory-list',
  templateUrl: './gmp.packing.preop.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingPreopInventoryListComponent implements OnInit, OnDestroy {
  @Input() type: InventoryType
  @Input() printHeader: boolean = false
  @Language() lang: string
  drag: ISubscription = null
  dragend: ISubscription = null

  constructor(private dragulaService: DragulaService, public events: Events, public server: BackendService) {
    
  }

  ngOnInit(){
    console.log("NgOnInit of Preop Inventory List")
    this.dragulaService.setOptions(this.type.en, {
      moves: function (el, container, handle) {
        return (handle.classList.contains('handle'))
      },
      revertOnSpill: true
    })

    this.drag = this.dragulaService.drag.subscribe((value) => {
      console.log("Dragula Drag Subscription")
      this.events.publish("scroll:stop", "Scroll Stopped")
    })

    this.dragend = this.dragulaService.dragend.subscribe((value) => {
      console.log("Dragula Dragend Subscription")
      this.events.publish("scroll:start", "Scroll Started")
      let index = 1
      for(let item in this.type.inventory){
        this.type.inventory[item].position = index++
        let reorderForm = new FormData()
        reorderForm.append("item_id", "" + this.type.inventory[item].id)
        reorderForm.append("position", "" + this.type.inventory[item].position)
        this.server.update(
          'reorder-gmp-packing-preop',
          reorderForm,
          (response: any) => {
            console.log("Item reordered")
          }
        )
      }
    })
  }

  ngOnDestroy(){
    if (this.dragulaService.find(this.type.en) !== undefined){
      console.warn("Dragula bag " + this.type.en + " destroyed")
      this.drag.unsubscribe()
      this.dragend.unsubscribe()
      this.dragulaService.destroy(this.type.en)
    } else {
      console.error("No Dragula bag present on gmp-packing-preop Inventory")
    }
  }
}