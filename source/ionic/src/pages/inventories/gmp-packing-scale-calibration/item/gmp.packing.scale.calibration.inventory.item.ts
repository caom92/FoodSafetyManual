import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { Toggle } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { ToastService } from '../../../../services/app.toasts'
import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que controla un elemento de inventario de GMP Packing Scale
 * Calibration
 * 
 * @export
 * @class GMPPackingScaleCalibrationInventoryItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-scale-calibration-inventory-item',
  templateUrl: './gmp.packing.scale.calibration.inventory.item.html'
})

export class GMPPackingScaleCalibrationInventoryItemComponent implements OnInit {
  @ViewChild('item_toggle') private item_toggle: Toggle = null
  @Input() private item: InventoryItem = null
  @Input() private type: string = ""
  private toggleError: boolean = false
  private previousValue: boolean = null

  constructor(private toastService: ToastService,
    private inventoryService: InventoryService) {

  }

  /**
   * Asigna el valor activo/inactivo del elemento en el componente Toggle
   * 
   * @memberof GMPPackingScaleCalibrationInventoryItemComponent
   */

  public ngOnInit(): void {
    this.item_toggle.value = this.item.is_active == 1
  }

  /**
   * Activa/desactiva un elemento a través del servicio de inventarios
   * 
   * @memberof GMPPackingScaleCalibrationInventoryItemComponent
   */

  public toggleItem(): void {
    if (this.toggleError) {
      this.item_toggle.value = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = !this.item_toggle.value
      this.inventoryService.toggleItem(this.item, "toggle-gmp-packing-scale-calibration").then(success => {
        if (this.item_toggle.value) {
          this.toastService.showText("itemChargeSuccess")
          this.item.is_active = 1
        } else {
          this.toastService.showText("itemDischargeSuccess")
          this.item.is_active = 0
        }
      }, error => {
        this.toggleError = true
        this.toggleItem()
      })
    }
  }
}