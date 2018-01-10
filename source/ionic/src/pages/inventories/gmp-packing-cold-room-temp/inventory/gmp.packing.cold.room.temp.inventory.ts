import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { ModalController, Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.cold.room.temp.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GMPPackingColdRoomTempAddItemComponent } from '../add-item/gmp.packing.cold.room.temp.add.item'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryComponent } from '../../super-inventory/super.inventory'

/**
 * Componente que administra el inventario de GMP Packing Thermo Calibration
 * 
 * @export
 * @class GMPPackingColdRoomTempInventoryComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-cold-room-temp-inventory',
  templateUrl: './gmp.packing.cold.room.temp.inventory.html'
})

export class GMPPackingColdRoomTempInventoryComponent extends SuperInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: Events,
    inventoryService: InventoryService,
    modalController: ModalController) {
    super(events, inventoryService, modalController)
  }

  /**
   * Se suscribe a los eventos de control de scroll y recupera el inventario
   * del servicio de inventarios al inicializar el componente
   * 
   * @memberof GMPPackingColdRoomTempInventoryComponent
   */

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-cold-room-temp")
    super.ngOnInit()
  }

  /**
   * Crea un modal para agregar un elemento de inventario de GMP Packing Thermo
   * Calibration
   * 
   * @memberof GMPPackingColdRoomTempInventoryComponent
   */

  public addItem(): void {
    super.addItem(GMPPackingColdRoomTempAddItemComponent, null, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
      this.emptyInventoryFlag = false
    })
  }

  /**
   * Actualiza una bandera que indica si el inventario se encuentra vacío
   * para permitirle a la vista mostrar un mensaje en consecuencia
   * 
   * @returns {boolean}
   * @memberof GMPPackingColdRoomTempInventoryComponent
   */

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}