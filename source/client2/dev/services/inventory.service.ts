import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { ToastsService } from './toasts.service'

@Injectable()
export class InventoryService {
  constructor(private apiService: BackendAPIService, private toastService: ToastsService) {

  }

  public getInventory(suffix: string): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('inventory-' + suffix).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return inventoryPromise
  }

  public getInventoryByArea(suffix: string, data: any): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('inventory-' + suffix, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return inventoryPromise
  }

  public toggleItem(suffix: string, data: any): Promise<any> {
    let togglePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('toggle-' + suffix, data).then(success => {
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

  public reorderInventory(suffix: string, data: any): Promise<any> {
    let reorderPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('reorder-' + suffix, { items: data }).then(success => {
        resolve(success)
      }, error => {
        if (error === Number(error)) {
          this.toastService.showClientMessage('reverse-bad-request', 1)
        }
        reject(error)
      })
    })

    return reorderPromise
  }

  public addItem(suffix: string, data: any): Promise<any> {
    let addPromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('add-' + suffix, { key: 'Titles.add_item' }, { key: 'Messages.add_item', args: { item: data.name } }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return addPromise
  }
}