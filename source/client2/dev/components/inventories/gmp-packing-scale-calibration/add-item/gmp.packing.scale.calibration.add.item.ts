import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'; import { ToastsService } from '../../../../services/app.toasts'

import { AlertController } from '../../../../services/alert/app.alert'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: '[gmp-packing-scale-calibration-add-item]',
  templateUrl: './gmp.packing.scale.calibration.add.item.html'
})

export class GMPPackingScaleCalibrationAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() private lang: string
  @Input() private types: Array<any> = []
  newItem: FormGroup = new FormBuilder().group({})

  constructor(alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService, events: PubSubService, toastService: ToastsService) {
    super(_fb, alertCtrl, ts, inventoryService, events, toastService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-scale-calibration")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      type: [null, [Validators.required]]
    })
  }

  public addItem(): void {
    let data = { type: this.newItem.value.type, item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    //let data: { item: {id: number, is_active: number, name: string, position: number }, [key: string]: any, type?: string } = { type: this.newItem.value.type, item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    let itemData = { type_id: String(this.newItem.value.type), scale_name: String(this.newItem.value.name) }
    super.addItem(data, itemData)
  }
}