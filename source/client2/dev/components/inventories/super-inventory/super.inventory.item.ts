import { InventoryService } from '../../../services/app.inventory'
import { SuperInventoryItemInterface } from './super.inventory.interface'

//import { Toggle } from 'ionic-angular'
/**
 * Clase padre que pueden usar los componentes de cualquier inventario para
 * desplegar y controlar un elemento de inventario
 * 
 * @export
 * @class SuperInventoryItemComponent
 */

export class SuperInventoryItemComponent {
  //@ViewChild('item_toggle') private item_toggle: Toggle = null
  private suffix: string = null
  protected toggleValue: boolean = true
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
    if (this.item.is_active == 1) {
      this.toggleValue = true
    } else {
      this.toggleValue = false
    }
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
      this.toggleValue = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = this.toggleValue
      this.inventoryService.toggleItem(this.suffix, this.item).then(success => {

      }, error => {
        this.toggleError = true
        this.toggleItem()
      })
    }
  }
}