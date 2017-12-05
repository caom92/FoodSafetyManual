import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Platform, NavParams, ViewController, AlertController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'

import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que despliega y controla el funcionamiento del modal para añadir
 * inventario de GMP Packing Scissors Knives
 * 
 * @export
 * @class GMPPackingScissorsKnivesAddItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-scissors-knives-add-item',
  templateUrl: './gmp.packing.scissors.knives.add.item.html'
})

export class GMPPackingScissorsKnivesAddItemComponent implements OnInit {
  @Language() private lang: string
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
   * @memberof GMPPackingScissorsKnivesAddItemComponent
   */

  public ngOnInit(): void {
    this.newItem = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      quantity: ["", [Validators.required]]
    })
  }

  /**
   * Cierra el modal sin regresar datos
   * 
   * @memberof GMPPackingScissorsKnivesAddItemComponent
   */

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * Envía una confirmación al usuario antes de enviar los datos del nuevo
   * elemento de inventario al servicio de inventario
   * 
   * @memberof GMPPackingScissorsKnivesAddItemComponent
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
              let data: { item: InventoryItem } = { item: { id: 0, is_active: 1, name: this.newItem.value.name, quantity: this.newItem.value.quantity } }
              let itemData = { name: String(data.item.name), quantity: String(data.item.quantity) }

              this.inventoryService.addItem(itemData, "add-gmp-packing-scissors-knives").then(success => {
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