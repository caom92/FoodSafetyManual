import { Component, Input, OnInit } from '@angular/core'
import { App, ModalController, Events, NavController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GMPPackingGlassBrittleAddItemComponent } from '../add-item/gmp.packing.glass.brittle.add.item'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gmp-packing-glass-brittle-inventory',
  templateUrl: './gmp.packing.glass.brittle.inventory.html',
  providers: [
    BackendService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingGlassBrittleInventoryComponent implements OnInit {
  @Language()
  lang: string

  @Input()
  inventory: Array<InventoryItem> = [{id: null, quantity: null, name: null, order: null, is_active: null}]

  areas: Array<{id:number,position:number,name:string}>

  selectedArea: number = null

  emptyInventoryFlag: boolean = null

  scrollAllowed: boolean = true

  constructor(public events: Events, public modalController: ModalController, public server: BackendService, public navCtrl: NavController, public loaderService: LoaderService, public ts: TService, private toastService: ToastService, public app: App){

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
      'get-areas-of-zone-gmp-packing-preop',
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
      'inventory-gmp-packing-glass-brittle',
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
    let modal = this.modalController.create(GMPPackingGlassBrittleAddItemComponent, {area_id:this.selectedArea})
    modal.present()
    modal.onDidDismiss(data => {
      if(data){
        for(let item in this.inventory){
          if(this.inventory[item].id == data.item){
            data.item.position = this.inventory.length + 1
            this.inventory.push(data.item)
            this.emptyInventoryFlag = false
          }
        }
      }
    })
  }

  checkEmptyInventory(){
    /*let emptyCount = 0
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
    }*/
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}