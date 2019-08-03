import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PubSubService } from 'angular2-pubsub'

import { FormUtilService } from '../../../../services/form-util.service'
import { InventoryService } from '../../../../services/inventory.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: '[gap-packing-harvest-tool-add-item]',
  templateUrl: './gap-packing-harvest-tool-add-item.component.html'
})

export class GAPPackingHarvestToolAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  newItem: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, inventoryService: InventoryService, events: PubSubService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(_fb, inventoryService, events, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-harvest-tool')
    this.createItemForm({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    let itemData = { name: this.newItem.value.name }
    super.addItem(data, itemData)
  }
}