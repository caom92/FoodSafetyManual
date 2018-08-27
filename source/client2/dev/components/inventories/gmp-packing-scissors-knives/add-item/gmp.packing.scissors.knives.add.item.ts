import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AlertController } from '../../../../services/alert/app.alert'
import { InventoryService } from '../../../../services/app.inventory'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: '[gmp-packing-scissors-knives-add-item]',
  templateUrl: './gmp.packing.scissors.knives.add.item.html'
})

export class GMPPackingScissorsKnivesAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() private lang: string
  newItem: FormGroup = new FormBuilder().group({})

  constructor(alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService, events: PubSubService, toastService: ToastsService) {
    super(_fb, alertCtrl, ts, inventoryService, events, toastService)
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