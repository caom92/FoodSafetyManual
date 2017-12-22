import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { Toggle } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.cold.room.temp.inventory.interface'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gmp-packing-cold-room-temp-inventory-item',
  templateUrl: './gmp.packing.cold.room.temp.inventory.item.html',
  providers: [
    BackendService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingColdRoomTempInventoryItemComponent implements OnInit {
  @ViewChild('item_toggle') item_toggle: Toggle

  @Input()
  item: InventoryItem

  toggleError: boolean = false
  previousValue: boolean = null

  constructor(public server: BackendService, public loaderService: LoaderService, private toastService: ToastService){

  }

  ngOnInit(){
    this.item_toggle.value = this.item.is_active == 1
  }

  toggleItem(){
    if(this.toggleError){
      this.item_toggle.value = this.previousValue
      console.log("OnError " + this.toggleError)
      this.toggleError = false
    } else {
      let loaderToggle = this.loaderService.koiLoader("")
      this.previousValue = !this.item_toggle.value
      let item = new FormData()
      item.append("id", "" + this.item.id)
      loaderToggle.present()
      this.server.update(
        'toggle-gmp-packing-cold-room-temp',
        item,
        (response: any) => {
          if(this.item_toggle.value){
            console.log("Item activated: " + this.item.name)
            this.toastService.showText("itemChargeSuccess")
            this.item.is_active = 1
          } else {
            console.log("Item deactivated: " + this.item.name)
            this.toastService.showText("itemDischargeSuccess")
            this.item.is_active = 0
          }
          loaderToggle.dismiss()
        },
        (error: any, caught: Observable<void>) => {
          this.toggleError = true
          this.toggleItem()
          this.toastService.showText("serverUnreachable")
          loaderToggle.dismiss()
          return []
        }
      )
    }
  }
}