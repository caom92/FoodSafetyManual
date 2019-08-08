import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { ToastsService } from './toasts.service'

@Injectable()
export class AreaInventoryService {
  constructor(private apiService: BackendAPIService, private toastService: ToastsService) {

  }
  
  public getAreaInventory(suffix: string): Promise<any> {
    let areaInventoryPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('get-areas-of-zone-' + suffix).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return areaInventoryPromise
  }

  public getAreaInventoryByPosition(suffix: string): Promise<any> {
    let areaInventoryPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('get-areas-of-zone-by-position-' + suffix).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return areaInventoryPromise
  }

  public toggleArea(suffix: string, data: any): Promise<any> {
    let togglePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('toggle-area-' + suffix, data).then(success => {
        if (data.is_active == 0) {
          this.toastService.showClientMessage('item-charge-success', 0)
          data.is_active = 1
        } else {
          this.toastService.showClientMessage('item-discharge-success', 0)
          data.is_active = 0
        }
        resolve(success)
      }, error => {
        if (error === Number(error)) {
          this.toastService.showClientMessage('reverse-bad-request', 1)
        }
        reject(error)
      })
    })

    return togglePromise
  }

  public reorderAreaInventory(suffix: string, data: any): Promise<any> {
    let reorderPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('reorder-area-' + suffix, { items: data }).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return reorderPromise
  }

  public addArea(suffix: string, data: any): Promise<any> {
    let addAreaPromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('add-workplace-area-' + suffix, { key: 'Titles.add_area' }, { key: 'Messages.add_area', args: { area: data.area_name } }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return addAreaPromise
  }

  public editArea(suffix: string, data: any): Promise<any> {
    let editAreaPromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('edit-workplace-area-' + suffix, { key: 'Titles.edit_area' }, { key: 'Messages.edit_area' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return editAreaPromise
  }
}