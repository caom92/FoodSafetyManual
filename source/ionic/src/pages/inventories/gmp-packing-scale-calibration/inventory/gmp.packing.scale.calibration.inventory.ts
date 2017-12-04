import { Component, Input, OnInit } from '@angular/core'
import { ModalController, Events, NavController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { InventoryType } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GMPPackingScaleCalibrationAddItemComponent } from '../add-item/gmp.packing.scale.calibration.add.item'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'
import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que administra el inventario de GMP Packing Scale Calibration
 * 
 * @export
 * @class GMPPackingScaleCalibrationInventoryComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-scale-calibration-inventory',
  templateUrl: './gmp.packing.scale.calibration.inventory.html'
})

export class GMPPackingScaleCalibrationInventoryComponent implements OnInit {
  @Language() private lang: string
  @Input() private inventory: Array<InventoryType> = []
  private emptyInventoryFlag: boolean = null
  private scrollAllowed: boolean = true

  constructor(public events: Events,
    public modalController: ModalController,
    public server: BackendService,
    public navCtrl: NavController,
    public loaderService: LoaderService,
    public ts: TService,
    private toastService: ToastService,
    private inventoryService: InventoryService) {

  }

  /**
   * Se suscribe a los eventos de control de scroll y recupera el inventario
   * del servicio de inventarios al inicializar el componente
   * 
   * @memberof GMPPackingScaleCalibrationInventoryComponent
   */

  public ngOnInit(): void {
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.subscribe("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.inventoryService.getInventory("inventory-gmp-packing-scale-calibration").then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    }, error => {
      // Por el momento, no se necesita ninguna acción adicional en caso de
      // un error durante la recuperación de datos, ya que este caso se maneja
      // dentro del servicio de inventarios
    })
  }

  /**
   * Crea un modal para agregar un elemento para este inventario
   * 
   * @memberof GMPPackingScaleCalibrationInventoryComponent
   */

  public addItem(): void {
    let type_array: Array<{ id: number, name: string }> = []

    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, name: temp.name })
    }
    
    let modal = this.modalController.create(GMPPackingScaleCalibrationAddItemComponent, { type_array: type_array })
    modal.present()
    modal.onDidDismiss(data => {
      console.log("data del modal cerrado")
      console.log(data)
      if (data !== undefined && data !== null) {
        for (let type in this.inventory) {
          if (this.inventory[type].id == data.type) {
            data.item.position = this.inventory[type].items.length + 1
            this.inventory[type].items.push(data.item)
            this.emptyInventoryFlag = false
          }
        }
      }
    })
  }

  /**
   * Actualiza una bandera que indica si el inventario se encuentra vacío
   * para permitirle a la vista mostrar un mensaje en consecuencia
   * 
   * @returns 
   * @memberof GMPPackingScaleCalibrationInventoryComponent
   */

  public checkEmptyInventory(): boolean {
    // Para verificar que el inventario está vacío, se debe verificar que todos
    // sus tipos están vacíos

    // 'emptyCount' indica el número de inventarios de tipo vacíos
    let emptyCount = 0
    for (let type of this.inventory) {
      if (type.items.length == 0) {
        emptyCount++
      }
    }

    // Si el número de inventarios de tipo vacíos es igual al total de
    // inventarios, quiere decir que está totalmente vacío, caso contrario, al
    // menos uno de los inventarios tiene al menos un elemento
    if (emptyCount == this.inventory.length) {
      this.emptyInventoryFlag = true
      return true
    } else {
      this.emptyInventoryFlag = false
      return false
    }
  }
}