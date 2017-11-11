import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { Toggle } from 'ionic-angular'

import { InventoryItem } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { BackendService } from '../../../../services/app.backend'

@Component({
  selector: 'gmp-packing-scale-calibration-inventory-item',
  templateUrl: './gmp.packing.scale.calibration.inventory.item.html'
})

export class GMPPackingScaleCalibrationInventoryItemComponent implements OnInit {
  @ViewChild('item_toggle') item_toggle: Toggle

  @Input()
  item: InventoryItem

  @Input()
  type: string

  style: string = ""

  constructor(public server: BackendService){

  }

  ngOnInit(){
    this.item_toggle.value = this.item.is_active == 1
  }

  toggleItem(){
    let item = new FormData()
    item.append("id", "" + this.item.id)
    this.server.update(
      'toggle-gmp-packing-scale-calibration',
      item,
      (response: any) => {
        if(this.item_toggle.value){
          console.log("Item activated: " + this.item.name)
          this.item.is_active = 1
          this.style = ""
        } else {
          console.log("Item deactivated: " + this.item.name)
          this.item.is_active = 0
          this.style = "color: gray;"
        }   
      }
    )
  }
}