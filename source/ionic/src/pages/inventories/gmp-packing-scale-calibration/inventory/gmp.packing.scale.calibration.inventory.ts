import { Component, Input, OnInit } from '@angular/core'
import { ModalController, Events } from 'ionic-angular'

import { InventoryType } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GMPPackingScaleCalibrationAddItemComponent } from '../add-item/gmp.packing.scale.calibration.add.item'

@Component({
  selector: 'gmp-packing-scale-calibration-inventory',
  templateUrl: './gmp.packing.scale.calibration.inventory.html'
})

export class GMPPackingScaleCalibrationInventoryComponent implements OnInit {
  @Input()
  inventory: Array<InventoryType>

  scrollAllowed: boolean = true

  constructor(public events: Events, public modalController: ModalController){

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
  }

  addItem(){
    let type_array: Array<{id:number,name:string}> = []
    for(let temp of this.inventory){
      type_array.push({id:temp.id,name:temp.name})
    }
    let modal = this.modalController.create(GMPPackingScaleCalibrationAddItemComponent, {type_array:type_array})
    modal.present()
    modal.onDidDismiss(data => {
      if(data){
        for(let type in this.inventory){
          if(this.inventory[type].id == data.type){
            data.item.order = this.inventory[type].items.length + 1
            this.inventory[type].items.push(data.item)
          }
        }
      }
    })
  }
}