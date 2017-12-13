import { ViewChild, OnInit } from '@angular/core'
import { Toggle } from 'ionic-angular'
import { InventoryService } from '../../../services/app.inventory'
import { SuperInventoryItemInterface } from './super.inventory.interface'

/**
 * Clase padre que pueden usar los componentes de cualquier inventario para
 * desplegar y controlar un elemento de inventario
 * 
 * @export
 * @class SuperInventoryItemComponent
 */

export class SuperInventoryItemComponent {
  @ViewChild('item_toggle') private item_toggle: Toggle = null
  private suffix: string = null
  private toggleError: boolean = false
  private previousValue: boolean = null
  protected item: SuperInventoryItemInterface

  constructor(private inventoryService: InventoryService) {

  }

  /**
   * Asigna el valor del Toggle 
   * 
   * @param {boolean} status - Estado del toggle a asignar
   * @memberof SuperInventoryItemComponent
   */

  public setToggleValue(status: boolean): void {
    this.item_toggle.value = status
  }

  /**
   * Asigna el sufijo de la bitácora
   * 
   * @param {string} suffix - Sufijo de bitácora que corresponde al usado en la
   * base de datos
   * @memberof SuperInventoryItemComponent
   */

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  /**
   * Activa/desactiva un elemento a través del servicio de inventarios
   * 
   * @memberof SuperInventoryItemComponent
   */

  public toggleItem(): void {
    if (this.toggleError) {
      this.item_toggle.value = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = !this.item_toggle.value
      this.inventoryService.toggleItem(this.item, "toggle-" + this.suffix).then(success => {
        console.log("Toggle llamado desde la Super Clase")
      }, error => {
        this.toggleError = true
        this.toggleItem()
      })
    }
  }
}