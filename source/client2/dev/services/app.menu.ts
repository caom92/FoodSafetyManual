import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { ToastsService } from './app.toasts'

@Injectable()
export class MenuService {
  constructor(private loaderService: LoaderService,
    private toastService: ToastsService,
    private server: BackendService) {

  }

  public getMenu() {
    let menuPromise = new Promise<any>((resolve, reject) => {
      let menuLoader = this.loaderService.koiLoader()

      this.server.update(
        'get-menu',
        new FormData(),
        (response: any) => {
          console.log('response side')
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
          console.log('error side')
          reject('network error')
          menuLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return menuPromise
  }
}