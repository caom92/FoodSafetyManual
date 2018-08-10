import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { DashboardDirectory, DashboardFile } from '../components/dashboard/dashboard.interface'
import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { ToastsService } from './app.toasts'

@Injectable()
export class MenuService {
  constructor(private loaderService: LoaderService,
    private toastService: ToastsService,
    private server: BackendService) {

  }

  public getMenu(): Promise<any> {
    let menuPromise = new Promise<any>((resolve, reject) => {
      let menuLoader = this.loaderService.koiLoader()

      this.server.update(
        'get-menu',
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              menuLoader.dismiss()
            } else {
              reject('bad request')
              menuLoader.dismiss()
              this.toastService.showText('serverUnreachable')
            }
          } else {
            reject('bad request')
            menuLoader.dismiss()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          menuLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return menuPromise
  }

  public deleteElement(id: number): Promise<any> {
    let deletePromise = new Promise<any>((resolve, reject) => {
      let deleteLoader = this.loaderService.koiLoader()
      let deleteForm = new FormData()

      deleteForm.append('id', String(id))

      this.server.update(
        'delete-menu-element',
        deleteForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              deleteLoader.dismiss()
            } else {
              reject('bad request')
              deleteLoader.dismiss()
              this.toastService.showText('serverUnreachable')
            }
          } else {
            reject('bad request')
            deleteLoader.dismiss()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          deleteLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return deletePromise
  }

}