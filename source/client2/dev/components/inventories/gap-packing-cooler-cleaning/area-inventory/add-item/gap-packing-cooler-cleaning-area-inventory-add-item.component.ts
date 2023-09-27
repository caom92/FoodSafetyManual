import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { FormUtilService } from '../../../../../services/form-util.service'
import { ToastsService } from '../../../../../services/toasts.service'
import { SuperInventoryAddItemComponent } from '../../../super-inventory/super.inventory.add.item'
import { GAPPackingCoolerCleaningAreaInventoryService } from '../services/gap-packing-cooler-cleaning-area-inventory.service'

@Component({
  selector: '[gap-packing-cooler-cleaning-area-inventory-add-item]',
  templateUrl: './gap-packing-cooler-cleaning-area-inventory-add-item.component.html'
})

export class GAPPackingCoolerCleaningAreaInventoryAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() lang: string
  newItem: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, inventoryService: GAPPackingCoolerCleaningAreaInventoryService, events: PubSubService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(_fb, inventoryService, events, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
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