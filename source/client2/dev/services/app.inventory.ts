import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { ToastsService } from './app.toasts'

/**
 * Servicio que agrupa las funciones en común que pueden ser utilizadas por
 * inventarios de items y áreas
 * 
 * @export
 * @class InventoryService
 */

@Injectable()
export class InventoryService {
  constructor(private loaderService: LoaderService,
    private toastService: ToastsService,
    private server: BackendService,
    public ts: TService) {

  }

  /**
   * @function getInventory
   * 
   * Recupera los contenidos del inventario del servidor cuya dirección está
   * especificada en 'app.backend'.
   * 
   * De tener éxito regresa una promesa que contiene la respuesta del servidor,
   * en el caso contrario regresa un error.
   * 
   * @param {string} service - El nombre del servicio de inventario a solicitar
   * @returns {Promise<*>} Promesa que puede contener la respuesta del servidor
   * o un mensaje de error
   * @memberof InventoryService
   */

  public getInventory(suffix: string): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
      loader.present()
      this.server.update(
        'inventory-' + suffix,
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              loader.dismiss()
            } else {
              reject("bad request")
              loader.dismiss()
              this.toastService.showText("serverUnreachable")
            }
          } else {
            reject("bad request")
            loader.dismiss()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        },
        (error: any, caught: Observable<void>) => {
          reject("network error")
          loader.dismiss()
          this.toastService.showText("serverUnreachable")
          return []
        }
      )
    })

    return inventoryPromise
  }

  /**
   * 
   * 
   * @param {string} suffix 
   * @param {*} data 
   * @returns {void} 
   * @memberof InventoryService
   */

  public getInventoryByArea(suffix: string, data: any): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
      let form_data = new FormData()
      let area_data = data

      let flatObj = this.flatten(area_data)

      for (let key in flatObj) {
        if (flatObj[key] === true) {
          form_data.append(key, "1")
        } else if (flatObj[key] === false) {
          form_data.append(key, "0")
        } else {
          form_data.append(key, flatObj[key])
        }
      }

      loader.present()
      this.server.update(
        'inventory-' + suffix,
        form_data,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              loader.dismiss()
            } else {
              reject("bad request")
              loader.dismiss()
              this.toastService.showText("serverUnreachable")
            }
          } else {
            reject("bad request")
            loader.dismiss()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        },
        (error: any, caught: Observable<void>) => {
          reject("network error")
          loader.dismiss()
          this.toastService.showText("serverUnreachable")
          return []
        }
      )
    })

    return inventoryPromise
  }

  /**
   * @function toggleItem
   * 
   * Activa/Desactiva un elemento de inventario dentro del servidor 
   * 
   * @param {*} data - Información del elemento a dar de baja. Aunque existen
   * diferentes tipos, se espera mínimamente que este parámetro sea un objeto
   * con un atributo 'id' que sea un entero
   * @param {string} service - Nombre del servicio de activación/desactivación
   * @returns {Promise<void>} Promesa que informa del éxito/error de la 
   * petición al servidor
   * @memberof InventoryService
   */

  public toggleItem(data: any, service: string): Promise<void> {
    let togglePromise = new Promise<any>((resolve, reject) => {
      let loaderToggle = this.loaderService.koiLoader('')
      let item = new FormData()
      item.append("id", String(data.id))
      loaderToggle.present()
      this.server.update(
        service,
        item,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (data.is_active == 0) {
              this.toastService.showText("itemChargeSuccess")
              data.is_active = 1
            } else {
              this.toastService.showText("itemDischargeSuccess")
              data.is_active = 0
            }
            resolve()
            loaderToggle.dismiss()
          } else {
            reject()
            this.toastService.showText("lastActionReverseBadRequest")
            loaderToggle.dismiss()
          }
        },
        (error: any, caught: Observable<void>) => {
          reject()
          this.toastService.showText("serverUnreachable")
          loaderToggle.dismiss()
          return []
        }
      )
    })

    return togglePromise
  }

  /**
   * @function reorderInventory
   * 
   * Reordena los elementos del inventario de una bitácora, de 1 hasta n
   * 
   * @param {Array<{id: number, position: number}>} data - El arreglo de 
   * objetos con ID y posición de la lista de elementos a reordenar
   * @param {string} service - Nombre del servicio de reordenamiento
   * @returns {Promise<any>} 
   * @memberof InventoryService
   */

  public reorderInventory(data: Array<{ id: number, position: number }>, service: string): Promise<any> {
    let reorderPromise = new Promise<any>((resolve, reject) => {
      let loaderReorder = this.loaderService.koiLoader('')
      let reorderForm = new FormData()
      let flatData = this.flatten({ items: data })

      loaderReorder.present()
      for (let key in flatData) {
        reorderForm.append(key, flatData[key])
      }

      this.server.update(
        service,
        reorderForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            loaderReorder.dismiss()
            resolve("server")
          } else {
            loaderReorder.dismiss()
            this.toastService.showText("lastActionReverseBadRequest")
            reject(response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          loaderReorder.dismiss()
          this.toastService.showText("lastActionReverseNetwork")
          reject()
          return []
        }
      )
    })

    return reorderPromise
  }

  /**
   * @function addItem
   * 
   * Añade un nuevo elemento de inventario y se envía al servidor
   * 
   * @param {*} data - Objeto que representa el elemento a agregar el inventario 
   * @param {string} suffix 
   * @returns {Promise<*>} 
   * @memberof InventoryService
   */

  public addItem(data: any, suffix: string): Promise<any> {
    let addPromise = new Promise<any>((resolve, reject) => {
      let loaderAdd = this.loaderService.koiLoader('')
      let itemForm = new FormData()
      let flatData = this.flatten(data)

      loaderAdd.present()

      for (let key in flatData) {
        itemForm.append(key, flatData[key])
      }

      this.server.update(
        "add-" + suffix,
        itemForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            loaderAdd.dismiss()
            this.toastService.showText("itemAddSuccess")
            resolve(response.data)
          } else {
            loaderAdd.dismiss()
            this.toastService.showText("badRequest")
            reject()
          }
        },
        (error: any, caught: Observable<void>) => {
          loaderAdd.dismiss()
          reject()
          this.toastService.showText("serverUnreachable")
          return []
        }
      )
    })

    return addPromise
  }

  // https://stackoverflow.com/questions/43551221/angular-2-mark-nested-formbuilder-as-touched
  public setAsDirty(group: FormGroup | FormArray): void {
    group.markAsDirty()
    for (let i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty()
      } else {
        this.setAsDirty(group.controls[i])
      }
    }
  }

  /**
   * @function flatten
   * 
   * Aplana un objeto de cualquier profundidad para darle un formato adecuado
   * para usarse con Form Data y recibirlo en el servidor
   * 
   * @private
   * @param {*} data - Objeto que debe ser convertido a un formato utilizable
   * por el servidor al recibir un Form Data
   * @returns {Object} 
   * @memberof InventoryService
   */

  private flatten(data: any): Object {
    let result = {}

    function recurse(value, key) {
      if (Object(value) !== value) {
        result[key] = value
      } else if (Array.isArray(value)) {
        for (var i = 0, l = value.length; i < l; i++)
          recurse(value[i], key + "[" + i + "]")
        if (l == 0) result[key] = []
      } else {
        var isEmpty = true
        for (var k in value) {
          isEmpty = false
          recurse(value[k], key ? key + "[" + k + "]" : k)
        }
        if (isEmpty && key) result[key] = {}
      }
    }

    if (Object(data) !== data) {
      throw Error("Non-object parameter can't be flattened")
    } else {
      recurse(data, '')
    }

    return result
  }
}