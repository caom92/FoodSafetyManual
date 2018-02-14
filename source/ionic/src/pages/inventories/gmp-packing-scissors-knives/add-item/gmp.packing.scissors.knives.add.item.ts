import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'
import { AlertController, ViewController } from 'ionic-angular'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: 'gmp-packing-scissors-knives-add-item',
  templateUrl: './gmp.packing.scissors.knives.add.item.html'
})

export class GMPPackingScissorsKnivesAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() private lang: string
  newItem: FormGroup = new FormBuilder().group({})

  constructor(viewCtrl: ViewController, alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService) {
    super(viewCtrl, _fb, alertCtrl, ts, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-scissors-knives")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      quantity: ["", [Validators.required]]
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0, quantity: this.newItem.value.quantity } }
    let itemData = { name: this.newItem.value.name, quantity: this.newItem.value.quantity }
    super.addItem(data, itemData)
  }
}