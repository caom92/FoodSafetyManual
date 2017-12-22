import { Injectable } from '@angular/core'

import { App, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms'

import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { PendingLog } from '../pages/pending-logs/pending-card/pending.card.interface'

import { ToastService } from './app.toasts'
import { LoaderService } from './app.loaders'
import { BackendService } from './app.backend'

/**
 * Servicio que agrupa las funciones en común que pueden ser utilizadas por
 * inventarios de items y áreas
 * 
 * @function getInventory
 * 
 * @export
 * @class InventoryService
 */

@Injectable()
export class InventoryService {
  constructor(public app: App,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private server: BackendService,
    public ts: TService,
    private storage: Storage,
    private events: Events) {

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

  public getInventory(service: string): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
      loader.present()
      this.server.update(
        service,
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              loader.dismiss()
            } else {
              reject("bad request")
              loader.dismiss()
              this.app.getRootNav().pop()
              this.toastService.showText("serverUnreachable")
            }
          } else {
            reject("bad request")
            loader.dismiss()
            this.app.getRootNav().pop()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        },
        (error: any, caught: Observable<void>) => {
          reject("network error")
          loader.dismiss()
          this.app.getRootNav().pop()
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
      let loaderToggle = this.loaderService.koiLoader("")
      let item = new FormData()
      item.append("id", String(data.id))
      loaderToggle.present()
      this.server.update(
        service,
        item,
        (response: any) => {
          resolve()
          loaderToggle.dismiss()
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
   * Reordena los elementos del inventario de una bitácora, de 1 hasta n
   * 
   * @param {*} data 
   * @param {string} service 
   * @returns {Promise<any>} 
   * @memberof InventoryService
   */
  public reorderInventory(data: any, service: string): Promise<any> {
    return
  }
}