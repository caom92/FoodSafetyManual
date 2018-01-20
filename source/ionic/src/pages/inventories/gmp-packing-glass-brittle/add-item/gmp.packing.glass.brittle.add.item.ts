import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'
import { AlertController, NavParams, ViewController } from 'ionic-angular'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: 'gmp-packing-glass-brittle-add-item',
  templateUrl: './gmp.packing.glass.brittle.add.item.html'
})

export class GMPPackingGlassBrittleAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() lang: string
  newItem: FormGroup = new FormBuilder().group({})
  area_id: number

  constructor(public params: NavParams, viewCtrl: ViewController, alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService) {
    super(viewCtrl, _fb, alertCtrl, ts, inventoryService)
  }

  public ngOnInit(): void {
    this.area_id = this.params.get("area_id")
    this.setSuffix("gmp-packing-glass-brittle")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      quantity: ["",[Validators.required]]
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0, quantity: this.newItem.value.quantity } }
    let itemData = { name: this.newItem.value.name, room_id: this.area_id }
    super.addItem(data, itemData)
  }
}