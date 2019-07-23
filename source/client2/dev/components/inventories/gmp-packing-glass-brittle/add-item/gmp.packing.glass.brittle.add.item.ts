import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PubSubService } from 'angular2-pubsub'

import { FormUtilService } from '../../../../services/form-util.service'
import { InventoryService } from '../../../../services/inventory.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: '[gmp-packing-glass-brittle-add-item]',
  templateUrl: './gmp.packing.glass.brittle.add.item.html'
})

export class GMPPackingGlassBrittleAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Input() types: Array<any> = []
  @Input('area') area_id: number
  newItem: FormGroup = new FormBuilder().group({})
  
  constructor(_fb: FormBuilder, inventoryService: InventoryService, events: PubSubService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(_fb, inventoryService, events, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-glass-brittle')
    this.createItemForm({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      quantity: ['',[Validators.required]]
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0, quantity: this.newItem.value.quantity } }
    let itemData = { name: this.newItem.value.name, area_id: this.area_id, quantity: this.newItem.value.quantity }
    super.addItem(data, itemData)
  }
}