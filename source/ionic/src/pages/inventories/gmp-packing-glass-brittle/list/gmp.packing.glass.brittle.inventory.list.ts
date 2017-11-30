import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'

import { ISubscription } from 'rxjs/Subscription'

import { Language } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'

import { DragulaService } from 'ng2-dragula'

import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'

@Component({
  selector: 'gmp-packing-glass-brittle-inventory-list',
  templateUrl: './gmp.packing.glass.brittle.inventory.list.html',
  providers: [
    BackendService,
    TranslationService,
    DragulaService
  ]
})

export class GMPPackingGlassBrittleInventoryListComponent implements OnInit, OnDestroy {
  @Input()
  items: Array<InventoryItem>

  @Input()
  printHeader: boolean = false

  @Language()
  lang: string

  drag: ISubscription = null
  dragend: ISubscription = null

  constructor(private dragulaService: DragulaService, public events: Events, public server: BackendService) {
    
  }

  ngOnInit(){
    console.log("NgOnInit of Preop Inventory List")
    this.dragulaService.setOptions("glassBrittleItemsBag", {
      moves: function (el, container, handle) {
        return (handle.classList.contains('handle'))
      },
      revertOnSpill: true
    })

    this.drag = this.dragulaService.drag.subscribe((value) => {
      console.log("Dragula Drag Sunscription")
      this.events.publish("scroll:stop", "Scroll Stopped")
    })

    this.dragend = this.dragulaService.dragend.subscribe((value) => {
      console.log("Dragula Dragend Sunscription")
      this.events.publish("scroll:start", "Scroll Started")
      let index = 1
      for(let item in this.items){
        this.items[item].order = index++
        let reorderForm = new FormData()
        reorderForm.append("item_id", "" + this.items[item].id)
        reorderForm.append("position", "" + this.items[item].order)
        this.server.update(
          'reorder-gmp-packing-glass-brittle',
          reorderForm,
          (response: any) => {
            console.log("Item reordered")
          }
        )
      }
    })
  }

  ngOnDestroy(){
    if (this.dragulaService.find("glassBrittleItemBag") !== undefined){
      console.warn("Dragula bag " + "glassBrittleItemBag" + " destroyed")
      this.drag.unsubscribe()
      this.dragend.unsubscribe()
      this.dragulaService.destroy("glassBrittleItemBag")
    } else {
      console.error("No Dragula bag present on gmp-packing-glass-brittle Inventory")
    }
  }
}