import { Component, Input, OnInit } from '@angular/core'
import { App, ModalController, Events, NavController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { InventoryType } from '../interfaces/gap.packing.preop.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GAPPackingPreopAddItemComponent } from '../add-item/gap.packing.preop.add.item'

import { BackendService } from '../../../../services/app.backend'
import { ToastsService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gap-packing-preop-inventory',
  templateUrl: './gap.packing.preop.inventory.html',
  providers: [
    BackendService,
    ToastsService,
    LoaderService
  ]
})

export class GAPPackingPreopInventoryComponent implements OnInit {
  @Language()
  lang: string

  @Input()
  inventory: Array<InventoryType> = [{id: null, en: null, es: null, inventory: []}]

  areas: Array<{id:number,position:number,name:string}>

  selectedArea: number = null

  emptyInventoryFlag: boolean = null

  scrollAllowed: boolean = true

  constructor(public events: Events, public modalController: ModalController, public server: BackendService, public navCtrl: NavController, public loaderService: LoaderService, public ts: TService, private toastService: ToastsService, public app: App){

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

    this.events.subscribe("area:add", (data) => {
      this.areas.push(data)
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    })

    this.events.subscribe("area:edit", (oldData, newData) => {
      console.log(oldData)
      console.log(newData)
      let index = this.areas.findIndex((x => x.id==oldData.id))
      this.areas[index].name = newData.name
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    })

    let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
    loader.present()
    this.server.update(
      'get-areas-of-zone-gap-packing-preop',
      new FormData(),
      (response: any) => {
        this.areas = response.data
        loader.dismiss()
      },
      (error: any, caught: Observable<void>) => {
        loader.dismiss()
        this.toastService.showText("serverUnreachable")
        this.app.getRootNav().pop()
        return []
      }
    )
  }

  loadAreaInventory(event){
    let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
    loader.present()
    let tempForm = new FormData()
    tempForm.append("area_id", event)
    this.server.update(
      'get-items-of-area-gap-packing-preop',
      tempForm,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.inventory = response.data
            this.checkEmptyInventory()
            loader.dismiss()
          } else {
            loader.dismiss()
            this.toastService.showText("serverUnreachable")
            this.app.getRootNav().pop()
          }
        }
      },
      (error: any, caught: Observable<void>) => {
        loader.dismiss()
        this.toastService.showText("serverUnreachable")
        this.app.getRootNav().pop()
        return []
      }
    )
  }

  addItem(){
    let type_array: Array<{id:number,en:string,es:string}> = []
    for(let temp of this.inventory){
      type_array.push({id:temp.id,en:temp.en,es:temp.es})
    }
    let modal = this.modalController.create(GAPPackingPreopAddItemComponent, {type_array:type_array,area_id:this.selectedArea})
    modal.present()
    modal.onDidDismiss(data => {
      if(data){
        for(let type in this.inventory){
          if(this.inventory[type].id == data.type){
            data.item.position = this.inventory[type].inventory.length + 1
            this.inventory[type].inventory.push(data.item)
            this.emptyInventoryFlag = false
          }
        }
      }
    })
  }

  checkEmptyInventory(){
    let emptyCount = 0
    console.log("Inventory on checkEmptyInventory")
    console.log(this.inventory)
    
    for(let type of this.inventory){
      if(type.inventory.length == 0){
        emptyCount++
      }
    }

    if(emptyCount == this.inventory.length){
      this.emptyInventoryFlag = true
      return true
    } else {
      this.emptyInventoryFlag = false
      return false
    }
  }
}