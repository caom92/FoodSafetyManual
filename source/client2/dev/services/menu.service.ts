import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'

@Injectable()
export class MenuService {
  constructor(private apiService: BackendAPIService) {

  }

  public getMenuFiles(): Promise<any> {
    let menuPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('get-menu-files').then(success => {
        if (success !== null && success !== undefined) {
          for (let file of success) {
            file.upload_date = new Date(new Date(file.upload_date).getTime() + new Date(file.upload_date).getTimezoneOffset() * 60 * 1000)
          }
        }
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return menuPromise
  }

  public getMenu(userID?: number): Promise<any> {
    const suffix = (userID === Number(userID)) ? '-by-user' : ''

    let menuPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('get-menu' + suffix, { user_id: userID }).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return menuPromise
  }

  public deleteElement(id: number): Promise<any> {
    let deletePromise = new Promise<any>((resolve, reject) => {
      
    })

    return deletePromise
  }
}