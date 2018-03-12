import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'

import { AlertController } from '../../../../services/alert/app.alert'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'
import { PubSubService } from 'angular2-pubsub'; import { ToastsService } from '../../../../services/app.toasts'

@Component({
  selector: '[gap-packing-preop-add-item]',
  templateUrl: './gap.packing.preop.add.item.html'
})

export class GAPPackingPreopAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() lang: string
  @Input() types: Array<any> = []
  @Input("area") area_id: number
  newItem: FormGroup = new FormBuilder().group({})
  
  constructor(alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService, events: PubSubService, toastService: ToastsService) {
    super(_fb, alertCtrl, ts, inventoryService, events, toastService)
  }

  public ngOnInit(): void {
    //this.area_id = this.params.get("area_id")
    //this.types = this.params.get("type_array")
    this.setSuffix("gap-packing-preop")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      type: [null, [Validators.required]]
    })
  }

  public addItem(): void {
    let data = { type: this.newItem.value.type, item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    let itemData = { name: this.newItem.value.name, area_id: this.area_id, type_id: this.newItem.value.type }
    super.addItem(data, itemData)
  }
}