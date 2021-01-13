import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { ToastsService } from './toasts.service'

@Injectable()
export class SubjectInventoryService {
  constructor(private apiService: BackendAPIService, private toastService: ToastsService) {

  }

  public getSubjectInventory(suffix: string): Promise<any> {
    let inventoryPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('get-subject-of-zone-' + suffix).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return inventoryPromise
  }

  public toggleSubject(suffix: string, data: any): Promise<any> {
    let togglePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('toggle-subject-' + suffix, data).then(success => {
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

  public addSubject(suffix: string): Promise<any> {
    let addPromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('add-subject-' + suffix, { key: 'Titles.add_subject' }, { key: 'Messages.add_subject' }).then(success => {
        resolve(success)
      }, error => {
        reject(error)  
      })
    })

    return addPromise
  }
}