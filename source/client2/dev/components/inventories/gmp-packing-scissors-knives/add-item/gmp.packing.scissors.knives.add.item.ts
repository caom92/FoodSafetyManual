import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { ToastsService } from '../../../../services/app.toasts'
import { FormUtilService } from '../../../../services/form-util.service'
import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: '[gmp-packing-scissors-knives-add-item]',
  templateUrl: './gmp.packing.scissors.knives.add.item.html'
})

export class GMPPackingScissorsKnivesAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() lang: string
  newItem: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, inventoryService: InventoryService, events: PubSubService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(_fb, inventoryService, events, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-scissors-knives')
    this.createItemForm({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      quantity: ['', [Validators.required]]
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0, quantity: this.newItem.value.quantity } }
    let itemData = { name: this.newItem.value.name, quantity: this.newItem.value.quantity }
    super.addItem(data, itemData)
  }
}