import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { AlertController, NavParams, ViewController } from 'ionic-angular'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: 'gmp-packing-cold-room-temp-add-item',
  templateUrl: './gmp.packing.cold.room.temp.add.item.html'
})

export class GMPPackingColdRoomTempAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  newItem: FormGroup = new FormBuilder().group({})

  constructor(public params: NavParams, viewCtrl: ViewController, alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService) {
    super(viewCtrl, _fb, alertCtrl, ts, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-cold-room-temp")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    let itemData = { name: this.newItem.value.name }
    super.addItem(data, itemData)
  }
}