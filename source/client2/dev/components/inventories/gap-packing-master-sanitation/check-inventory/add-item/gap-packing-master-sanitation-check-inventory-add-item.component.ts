import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { FormUtilService } from '../../../../../services/form-util.service'
import { ToastsService } from '../../../../../services/toasts.service'
import { SuperInventoryAddItemComponent } from '../../../super-inventory/super.inventory.add.item'
import { GAPPackingMasterSanitationCheckInventoryService } from '../services/gap-packing-master-sanitation-check-inventory.service'

@Component({
  selector: '[gap-packing-master-sanitation-check-inventory-add-item]',
  templateUrl: './gap-packing-master-sanitation-check-inventory-add-item.component.html'
})

export class GAPPackingMasterSanitationCheckInventoryAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() lang: string
  @Input() types: Array<any> = []
  @Input('area') area_id: number
  newItem: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, inventoryService: GAPPackingMasterSanitationCheckInventoryService, events: PubSubService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(_fb, inventoryService, events, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
    this.createItemForm({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      type: [null, [Validators.required]]
    })
  }

  public addItem(): void {
    let data = { type: this.newItem.value.type, area_id: this.area_id, item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    let itemData = { name: this.newItem.value.name, area_id: this.area_id, type_id: this.newItem.value.type }
    super.addItem(data, itemData)
  }
}