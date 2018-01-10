import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Platform, NavParams, ViewController, AlertController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.thermo.calibration.inventory.interface'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from '../../super-inventory/super.inventory.add.item'

/**
 * Componente que despliega y controla el funcionamiento del modal para añadir
 * inventario de GMP Packing Thermo Calibration
 * 
 * @export
 * @class GMPPackingThermoCalibrationAddItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-thermo-calibration-add-item',
  templateUrl: './gmp.packing.thermo.calibration.add.item.html'
})

export class GMPPackingThermoCalibrationAddItemComponent extends SuperInventoryAddItemComponent implements OnInit {
  @Language() private lang: string
  private types: Array<any> = []
  newItem: FormGroup = new FormBuilder().group({})

  constructor(public params: NavParams,
    viewCtrl: ViewController,
    alertCtrl: AlertController,
    ts: TService,
    _fb: FormBuilder,
    inventoryService: InventoryService) {
    super(viewCtrl, _fb, alertCtrl, ts, inventoryService)
  }

  /**
   * Obtiene los parámetros pasados por el Nav, asigna el sufijo de esta
   * bitácora e inicializa el FormGroup de adición de inventario
   * 
   * @memberof GMPPackingThermoCalibrationAddItemComponent
   */

  public ngOnInit(): void {
    this.types = this.params.get("type_array")
    this.setSuffix("gmp-packing-thermo-calibration")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  /**
   * Envía un objeto que corresponde al item que se agrega en la lista de esta
   * bitácora, y otro que corresponde al objeto que es recibido por el servidor
   * para añadir dicho elemento al inventario localizado en el servidor
   * 
   * @memberof GMPPackingThermoCalibrationAddItemComponent
   */

  public addItem(): void {
    let data = {item:{ id: 0, is_active: 1, name: this.newItem.value.name, position: 0 }}
    let itemData = { name: this.newItem.value.name }
    super.addItem(data, itemData)
  }
}