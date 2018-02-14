import { Events, ModalController } from 'ionic-angular'

import { SuperInventoryAreaInterface } from './super.area.inventory.interface'

export class SuperInventoryAreaComponent {
  protected area: SuperInventoryAreaInterface

  constructor(private modalController: ModalController, protected events: Events) {

  }

  /**
   * Abre un modal que muestra un formulario para editar un área
   * 
   * @param {*} editAreaComponent - Componente específico de bitácora que
   * contiene el formulario de edición
   * @param {*} data - Parámetors que deberán ser pasados al componente de
   * edición de área
   * @param {Function} handler - Función que determina qué debe hacerse con los
   * datos devueltos por el modal. Esta función solo se ejecutará cuando el
   * modal haya regresado datos
   * @memberof SuperInventoryAreaComponent
   */

  public editArea(editAreaComponent: any, data: any, handler: Function): void {
    let modal = this.modalController.create(editAreaComponent, data)
    modal.present()
    modal.onDidDismiss(data => {
      if (data !== undefined && data !== null) {
        handler(data)
      }
    })
  }
}