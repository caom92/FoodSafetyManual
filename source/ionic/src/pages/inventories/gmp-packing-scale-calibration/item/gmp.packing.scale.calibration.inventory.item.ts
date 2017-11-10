import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { Toggle } from 'ionic-angular'

import { InventoryItem } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

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

  ngOnInit(){
    this.item_toggle.value = this.item.is_active == 1
  }

  toggleItem(){
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
}