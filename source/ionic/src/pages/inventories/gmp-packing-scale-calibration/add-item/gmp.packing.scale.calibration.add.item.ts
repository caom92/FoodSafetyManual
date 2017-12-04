import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Platform, NavParams, ViewController, AlertController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que despliega y controla el funcionamiento del modal para añadir
 * inventario de GMP Packing Scale Calibration
 * 
 * @export
 * @class GMPPackingScaleCalibrationAddItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-scale-calibration-add-item',
  templateUrl: './gmp.packing.scale.calibration.add.item.html'
})

export class GMPPackingScaleCalibrationAddItemComponent implements OnInit {
  @Language() private lang: string
  private types: Array<any> = []
  private newItem: FormGroup = new FormBuilder().group({})

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public ts: TService,
    private _fb: FormBuilder,
    private inventoryService: InventoryService) {

  }

  /**
   * Obtiene los parámetros pasados por el Nav e inicializa el FormGroup de
   * adición de inventario
   * 
   * @memberof GMPPackingScaleCalibrationAddItemComponent
   */

  public ngOnInit(): void {
    this.types = this.params.get("type_array")
    this.newItem = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      type: [null, [Validators.required]]
    })
  }

  /**
   * Cierra el modal sin regresar datos
   * 
   * @memberof GMPPackingScaleCalibrationAddItemComponent
   */

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * Envía una confirmación al usuario antes de enviar los datos del nuevo
   * elemento de inventario al servicio de inventario
   * 
   * @memberof GMPPackingScaleCalibrationAddItemComponent
   */

  public addItem(): void {
    if (this.newItem.valid) {
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.add_item"),
        message: this.ts.translate("Messages.add_item") + "<br><br>" + this.newItem.value.name,
        buttons: [
          {
            text: this.ts.translate("Options.cancel"),
            handler: () => {
              console.log('Cancelar');
            }
          },
          {
            text: this.ts.translate("Options.accept"),
            handler: () => {
              let data: { type: number, item: InventoryItem } = { type: this.newItem.value.type, item: { id: 0, is_active: 1, name: this.newItem.value.name, position: 0 } }
              let itemData = { type_id: String(data.type), scale_name: String(data.item.name) }

              this.inventoryService.addItem(itemData, "add-gmp-packing-scale-calibration").then(success => {
                data.item.id = success
                this.viewCtrl.dismiss(data)
              }, error => {
                this.viewCtrl.dismiss()
              })
            }
          }
        ]
      })
      confirmAdd.present()
    } else {
      console.log("New item not valid")
    }
  }
}