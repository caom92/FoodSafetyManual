import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'; import { ToastsService } from '../../../../services/app.toasts'

import { AlertController } from '../../../../services/alert/app.alert'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: '[gmp-self-inspection-pest-control-add-item]',
  templateUrl: './gmp.self.inspection.pest.control.add.item.html'
})

export class GMPSelfInspectionPestControlAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() lang: string
  @Input() types: Array<any> = []
  @Input("area") area_id: number
  newItem: FormGroup = new FormBuilder().group({})
  
  constructor(alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService, events: PubSubService, toastService: ToastsService) {
    super(_fb, alertCtrl, ts, inventoryService, events, toastService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-self-inspection-pest-control")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    let itemData = { name: this.newItem.value.name, room_id: this.area_id }
    super.addItem(data, itemData)
  }
}