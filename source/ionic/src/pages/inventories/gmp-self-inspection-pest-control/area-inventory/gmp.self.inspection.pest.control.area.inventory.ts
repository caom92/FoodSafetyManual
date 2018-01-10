import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { ModalController, Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

//import { GMPSelfInspectionPestControlAddAreaComponent } from '../add-item/gmp.self.inspection.pest.control.add.item'
import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'

/**
 * Componente que administra el inventario de GMP Packing Thermo Calibration
 * 
 * @export
 * @class GMPSelfInspectionPestControlInventoryComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-self-inspection-pest-control-area-inventory',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.html'
})

export class GMPSelfInspectionPestControlAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(events: Events,
    areaManagerService: AreaManagerService,
    modalController: ModalController) {
    super(events, areaManagerService, modalController)
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
    //console.log("Add item pest control")
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