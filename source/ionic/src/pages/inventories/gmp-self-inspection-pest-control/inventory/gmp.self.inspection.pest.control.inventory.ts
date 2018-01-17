import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'

/**
 * Componente que administra el inventario de GMP Packing Thermo Calibration
 * 
 * @export
 * @class GMPSelfInspectionPestControlInventoryComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory',
  templateUrl: './gmp.self.inspection.pest.control.inventory.html'
})

export class GMPSelfInspectionPestControlInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: Events,
    inventoryService: InventoryService,
    modalController: ModalController,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, modalController, areaManagerService)
  }

  /**
   * Se suscribe a los eventos de control de scroll y recupera el inventario
   * del servicio de inventarios al inicializar el componente
   * 
   * @memberof GMPSelfInspectionPestControlInventoryComponent
   */

  public ngOnInit(): void {
    this.setSuffix("gmp-self-inspection-pest-control")
    super.ngOnInit()
  }

  /**
   * Crea un modal para agregar un elemento de inventario de GMP Packing Thermo
   * Calibration
   * 
   * @memberof GMPSelfInspectionPestControlInventoryComponent
   */

  public addItem(): void {
    console.log("Add item pest control")
    /*super.addItem(GMPSelfInspectionPestControlAddItemComponent, null, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
      this.emptyInventoryFlag = false
    })*/
  }

  /**
   * Actualiza una bandera que indica si el inventario se encuentra vacío
   * para permitirle a la vista mostrar un mensaje en consecuencia
   * 
   * @returns {boolean}
   * @memberof GMPSelfInspectionPestControlInventoryComponent
   */

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}