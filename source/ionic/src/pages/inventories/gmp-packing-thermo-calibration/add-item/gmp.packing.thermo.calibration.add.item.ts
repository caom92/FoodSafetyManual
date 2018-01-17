import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'
import { AlertController, NavParams, ViewController } from 'ionic-angular'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

@Component({
  selector: 'gmp-packing-thermo-calibration-add-item',
  templateUrl: './gmp.packing.thermo.calibration.add.item.html'
})

export class GMPPackingThermoCalibrationAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() private lang: string
  private types: Array<any> = []
  newItem: FormGroup = new FormBuilder().group({})

  constructor(public params: NavParams, viewCtrl: ViewController, alertCtrl: AlertController, ts: TService, _fb: FormBuilder, inventoryService: InventoryService) {
    super(viewCtrl, _fb, alertCtrl, ts, inventoryService)
  }

  public ngOnInit(): void {
    this.types = this.params.get("type_array")
    this.setSuffix("gmp-packing-thermo-calibration")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public addItem(): void {
    let data = { item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
    let itemData = { name: this.newItem.value.name }
    super.addItem(data, itemData)
  }
}