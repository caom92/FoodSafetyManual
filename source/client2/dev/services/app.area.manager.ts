import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { TranslationService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { FlattenService } from './flatten.service'
import { ToastsService } from './toasts.service'

@Injectable()
export class AreaManagerService {
  constructor(private loaderService: LoaderService,
    private flattenService: FlattenService,
    private toastService: ToastsService,
    private server: BackendService,
    public translationService: TranslationService) {

  }

  public getAreaInventory(suffix: string): Promise<any> {
    let areaInventoryPromise = new Promise<any>((resolve, reject) => {
      let loader = this.loaderService.koiLoader()
      
      this.server.update(
        'get-areas-of-zone-' + suffix,
        new FormData(),
        (response: any) => {
          this.toastService.showServerMessage('get-areas-of-zone-' + suffix, response.meta.return_code)
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

    return areaInventoryPromise
  }

  public getAreaInventoryByPosition(suffix: string): Promise<any> {
    let areaInventoryPromise = new Promise<any>((resolve, reject) => {
      let loader = this.loaderService.koiLoader()

      this.server.update(
        'get-areas-of-zone-by-position-' + suffix,
        new FormData(),
        (response: any) => {
          this.toastService.showServerMessage('get-areas-of-zone-by-position-' + suffix, response.meta.return_code)
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

    return areaInventoryPromise
  }

  public reorderAreaInventory(data: Array<{ id: number, position: number }>, suffix: string): Promise<any> {
    let reorderPromise = new Promise<any>((resolve, reject) => {
      let loaderReorder = this.loaderService.koiLoader()
      let reorderForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten({ items: data }))

      this.server.update(
        'reorder-area-' + suffix,
        reorderForm,
        (response: any) => {
          loaderReorder.dismiss()
          this.toastService.showServerMessage('reorder-area-' + suffix, response.meta.return_code)
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

  public addArea(data: any, suffix: string): Promise<any> {
    let areaPromise = new Promise<any>((resolve, reject) => {
      let areaLoader = this.loaderService.koiLoader()
      let areaForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))

      this.server.update(
        'add-workplace-area-' + suffix,
        areaForm,
        (response: any) => {
          this.toastService.showServerMessage('add-workplace-area-' + suffix, response.meta.return_code)
          areaLoader.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject(response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          areaLoader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return areaPromise
  }

  public editArea(data: any, suffix: string): Promise<any> {
    let editPromise = new Promise<any>((resolve, reject) => {
      let loaderEdit = this.loaderService.koiLoader()
      let editForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))

      this.server.update(
        'edit-workplace-area-' + suffix,
        editForm,
        (response: any) => {
          this.toastService.showServerMessage('edit-workplace-area-' + suffix, response.meta.return_code)
          loaderEdit.dismiss()
          if (response.meta.return_code == 0) {            
            resolve(response.data)
          } else {
            reject(response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          loaderEdit.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return editPromise
  }

  public toggleArea(data: any, suffix: string): Promise<void> {
    let togglePromise = new Promise<any>((resolve, reject) => {
      let loaderToggle = this.loaderService.koiLoader()
      let item = new FormData()
      item.append('id', String(data.id))
      this.server.update(
        'toggle-area-' + suffix,
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