import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'
import { Events, ModalController, NavController } from 'ionic-angular'
import { DragulaService } from 'ng2-dragula'
import { Observable } from 'rxjs/Rx'
import { ISubscription } from 'rxjs/Subscription'

import { BackendService } from '../../../../services/app.backend'
import { LoaderService } from '../../../../services/app.loaders'
import { ToastsService } from '../../../../services/app.toasts'
import { GMPPackingPreopAddAreaComponent } from '../add-area/gmp.packing.preop.add.area'
import { InventoryArea } from '../interfaces/gmp.packing.preop.area.inventory.interface'

@Component({
  selector: 'gmp-packing-preop-area-inventory',
  templateUrl: './gmp.packing.preop.area.inventory.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingPreopAreaInventoryComponent implements OnInit, OnDestroy {
  @Language()
  lang: string

  @Input()
  areaInventory: Array<InventoryArea> = [{id: null, name: null, position: null}]

  emptyInventoryFlag: boolean = null

  scrollAllowed: boolean = true

  drag: ISubscription = null
  dragend: ISubscription = null

  constructor(public events: Events, public modalController: ModalController, public server: BackendService, public navCtrl: NavController, public loaderService: LoaderService, public ts: TService, private toastService: ToastsService, private dragulaService: DragulaService){

  }
  
  ngOnInit(){
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.subscribe("scroll:start", (message)=>{
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
    loader.present()
    this.server.update(
      'get-areas-of-zone-by-position-gmp-packing-preop',
      new FormData(),
      (response: any) => {
        this.areaInventory = response.data
        this.checkEmptyInventory()
        loader.dismiss()
      },
      (error: any, caught: Observable<void>) => {
        loader.dismiss()
        this.toastService.showText("serverUnreachable")
        this.navCtrl.pop()
        return []
      }
    )

    this.dragulaService.setOptions("preopAreasBag", {
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
      for(let item in this.areaInventory){
        this.areaInventory[item].position = index++
        let reorderForm = new FormData()
        reorderForm.append("item_id", "" + this.areaInventory[item].id)
        reorderForm.append("position", "" + this.areaInventory[item].position)
        this.server.update(
          'reorder-area-gmp-packing-preop',
          reorderForm,
          (response: any) => {
            console.log(response)
            console.log("Item reordered")
          }
        )
      }
    })
  }

  ngOnDestroy(){
    if (this.dragulaService.find("preopAreasBag") !== undefined){
      console.warn("Dragula bag " + "preopAreasBag" + " destroyed")
      this.drag.unsubscribe()
      this.dragend.unsubscribe()
      this.dragulaService.destroy("preopAreasBag")
    } else {
      console.error("No Dragula bag present on gmp-packing-preop Inventory")
    }
  }

  /*addItem(){
    console.log("clicked")
  }*/

  addItem(){
    let modal = this.modalController.create(GMPPackingPreopAddAreaComponent)
    modal.present()
    modal.onDidDismiss(data => {
      if(data){
        this.areaInventory.push(data.area)
        this.events.publish("area:add", data.area)
        /*
        for(let type in this.inventory){
          if(this.inventory[type].id == data.type){
            data.item.position = this.inventory[type].inventory.length + 1
            this.inventory[type].inventory.push(data.item)
            this.emptyInventoryFlag = false
          }
        }*/
      }
    })
  }

  checkEmptyInventory(){
    this.emptyInventoryFlag = this.areaInventory.length == 0
    return this.areaInventory.length == 0
  }
}