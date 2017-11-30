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
   * Recupera los contenidos del inventario del servidor cuya dirección está
   * especificada en 'app.backend'.
   * 
   * De tener éxito regresa una promesa que contiene la respuesta del servidor,
   * en el caso contrario regresa un error.
   * 
   * @param {string} service 
   * @returns {Promise<*>}
   * @memberof InventoryService
   */
  getInventory(service: string) {
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
   * Activa/Desactiva un elemento de inventario dentro del servidor 
   * 
   * @param {*} data 
   * @param {string} service 
   * @returns {Promise<*>}
   * @memberof InventoryService
   */

  toggleItem(data: any, service: string) {
    let togglePromise = new Promise<any>((resolve, reject) => {
      let loaderToggle = this.loaderService.koiLoader("")
      let item = new FormData()
      item.append("id", "" + data.id)
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
}