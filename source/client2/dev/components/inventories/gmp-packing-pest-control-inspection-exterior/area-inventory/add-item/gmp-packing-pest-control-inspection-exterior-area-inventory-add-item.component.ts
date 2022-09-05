import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { FormUtilService } from '../../../../../services/form-util.service'
import { ToastsService } from '../../../../../services/toasts.service'
import { SuperInventoryAddItemComponent } from '../../../super-inventory/super.inventory.add.item'
import { GMPPackingPestControlInspectionExteriorAreaInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-area-inventory.service'

@Component({
  selector: '[gmp-packing-pest-control-inspection-exterior-area-inventory-add-item]',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-area-inventory-add-item.component.html'
})

export class GMPPackingPestControlInspectionExteriorAreaInventoryAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() lang: string
  newItem: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, inventoryService: GMPPackingPestControlInspectionExteriorAreaInventoryService, events: PubSubService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(_fb, inventoryService, events, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
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