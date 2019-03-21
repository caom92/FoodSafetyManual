import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { TranslationService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { ToastsService } from './app.toasts'
import { FlattenService } from './flatten.service'

@Injectable()
export class InventoryService {
  constructor(private loaderService: LoaderService,
    private flattenService: FlattenService,
    private toastService: ToastsService,
    private server: BackendService,
    public translationService: TranslationService) {

  }

  public getInventory(suffix: string): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      let loader = this.loaderService.koiLoader(this.translationService.translate('Connecting to Server'))

      this.server.update(
        'inventory-' + suffix,
        new FormData(),
        (response: any) => {
          this.toastService.showServerMessage('inventory-' + suffix, response.meta.return_code)
          loader.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject('bad request')
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          loader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return inventoryPromise
  }

  public getInventoryByArea(suffix: string, data: any): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      let loader = this.loaderService.koiLoader(this.translationService.translate('Connecting to Server'))
      let inventoryForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))

      this.server.update(
        'inventory-' + suffix,
        inventoryForm,
        (response: any) => {
          this.toastService.showServerMessage('inventory-', response.meta.return_code)
          loader.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject('bad request')
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          loader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return inventoryPromise
  }

  public toggleItem(suffix: string, data: any): Promise<void> {
    let togglePromise = new Promise<any>((resolve, reject) => {
      let loaderToggle = this.loaderService.koiLoader()
      let item = new FormData()
      item.append('id', String(data.id))

      this.server.update(
        'toggle-' + suffix,
        item,
        (response: any) => {
          loaderToggle.dismiss()
          if (response.meta.return_code == 0) {
            if (data.is_active == 0) {
              this.toastService.showClientMessage('item-charge-success', 0)
              data.is_active = 1
            } else {
              this.toastService.showClientMessage('item-discharge-success', 0)
              data.is_active = 0
            }
            resolve()
          } else {
            this.toastService.showClientMessage('reverse-bad-request', 1)
            reject()
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          loaderToggle.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return togglePromise
  }

  public reorderInventory(data: Array<{ id: number, position: number }>, suffix: string): Promise<any> {
    let reorderPromise = new Promise<any>((resolve, reject) => {
      let loaderReorder = this.loaderService.koiLoader()
      let reorderForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten({ items: data }))

      this.server.update(
        'reorder-' + suffix,
        reorderForm,
        (response: any) => {
          this.toastService.showServerMessage('reorder-' + suffix, response.meta.return_code)
          loaderReorder.dismiss()
          if (response.meta.return_code == 0) {
            resolve('server')
          } else {
            this.toastService.showClientMessage('reverse-bad-request', 1)
            reject(response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          loaderReorder.dismiss()
          this.toastService.showClientMessage('reverse-network', 1)
          reject('network error')
          return []
        }
      )
    })

    return reorderPromise
  }

  public addItem(suffix: string, data: Object): Promise<any> {
    let addPromise = new Promise<any>((resolve, reject) => {
      let loaderAdd = this.loaderService.koiLoader()
      let itemForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))

      this.server.update(
        'add-' + suffix,
        itemForm,
        (response: any) => {
          this.toastService.showServerMessage('add-' + suffix, response.meta.return_code)
          loaderAdd.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject()
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          loaderAdd.dismiss()
          reject('network error')
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
}