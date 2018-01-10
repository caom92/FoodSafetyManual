import { Component, Input, OnInit, OnDestroy } from '@angular/core'
//import { ModalController, Events } from 'ionic-angular'
import { PubSubService } from 'angular2-pubsub'

import { Language } from 'angular-l10n'

import { InventoryType } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

//import { HideFabDirective } from '../../../../directives/hide.fab'

//import { GMPPackingScaleCalibrationAddItemComponent } from '../add-item/gmp.packing.scale.calibration.add.item'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryComponent } from '../../super-inventory/super.inventory'
import { DragulaService } from 'ng2-dragula/components/dragula.provider'

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

export class GMPPackingScaleCalibrationInventoryComponent extends SuperInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryType> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService
  /*modalController: ModalController*/) {
    super(events, inventoryService, dragulaService)
  }

  /**
   * Se suscribe a los eventos de control de scroll y recupera el inventario
   * del servicio de inventarios al inicializar el componente
   * 
   * @memberof GMPPackingScaleCalibrationInventoryComponent
   */

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-scale-calibration")
    super.ngOnInit()
  }

  /**
   * Crea un modal para agregar un elemento de inventario de GMP Packing Scale
   * Calibration
   * 
   * @memberof GMPPackingScaleCalibrationInventoryComponent
   */

  public addItem(): void {
    console.log("Add item por implementar")
    /*let type_array: Array<{ id: number, name: string }> = []
    
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, name: temp.name })
    }
    
    super.addItem(GMPPackingScaleCalibrationAddItemComponent, { type_array: type_array }, (data) => {
      for (let type in this.inventory) {
        if (this.inventory[type].id == data.type) {
          data.item.position = this.inventory[type].items.length + 1
          this.inventory[type].items.push(data.item)
          this.emptyInventoryFlag = false
        }
      }
    })*/
  }

  /**
   * Actualiza una bandera que indica si el inventario se encuentra vacío
   * para permitirle a la vista mostrar un mensaje en consecuencia
   * 
   * @returns {boolean}
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