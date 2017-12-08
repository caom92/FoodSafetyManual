import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { Toggle } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.cold.room.temp.inventory.interface'

import { InventoryService } from '../../../../services/app.inventory'

@Component({
  selector: 'gmp-packing-cold-room-temp-inventory-item',
  templateUrl: './gmp.packing.cold.room.temp.inventory.item.html'
})

export class GMPPackingColdRoomTempInventoryItemComponent implements OnInit {
  @ViewChild('item_toggle') private item_toggle: Toggle
  @Input() private item: InventoryItem
  private toggleError: boolean = false
  private previousValue: boolean = null

  constructor(private inventoryService: InventoryService) {

  }

  public ngOnInit(): void {
    this.item_toggle.value = this.item.is_active == 1
  }

  public toggleItem(): void {
    if (this.toggleError) {
      this.item_toggle.value = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = !this.item_toggle.value
      this.inventoryService.toggleItem(this.item, "toggle-gmp-packing-cold-room-temp").then(success => {

      }, error => {
        this.toggleError = true
        this.toggleItem()
      })
    }
  }
}