import { Injectable } from '@angular/core'
import { TranslationService } from 'angular-l10n'
import { Observable } from 'rxjs'

import { AlertController } from './alert/app.alert'
import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { ToastsService } from './app.toasts'
import { FlattenService } from './flatten.service'

@Injectable()
export class CAPAService {
  constructor(private loaderService: LoaderService,
    private flattenService: FlattenService,
    private toastService: ToastsService,
    private server: BackendService,
    private alertCtrl: AlertController,
    private translationService: TranslationService) {

  }

  public capture(data: Object): Promise<any> {
    let capturePromise = new Promise<any>((resolve, reject) => {
      let captureLoader = this.loaderService.koiLoader()
      let captureForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))

      this.server.update(
        'capture-capa-form',
        captureForm,
        (response: any) => {
          this.toastService.showServerMessage('capture-capa-form', response.meta.return_code)
          captureLoader.dismiss()
          if (response.meta.return_code == 0) {
            resolve('server')
          } else {
            reject(response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          captureLoader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return capturePromise
  }

  public update(data: Object): Promise<any> {
    let updatePromise = new Promise<any>((resolve, reject) => {
      let updateLoader = this.loaderService.koiLoader()
      let updateForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))

      this.server.update(
        'update-capa-form',
        updateForm,
        (response: any) => {
          this.toastService.showServerMessage('update-capa-form', response.meta.return_code)
          updateLoader.dismiss()
          if (response.meta.return_code == 0) {
            resolve('server')
          } else {
            reject(response.meta.return_code)
          }          
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          updateLoader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return updatePromise
  }

  public authorization(id: number): Promise<any> {
    let authorizationPromise = new Promise<any>((resolve, reject) => {
      let authorizationLoader = this.loaderService.koiLoader()
      let authorizationForm = new FormData()

      authorizationForm.append('id', String(id))

      this.server.update(
        'authorization-report-capa-form',
        authorizationForm,
        (response: any) => {
          this.toastService.showServerMessage('authorization-report-capa-form', response.meta.return_code)
          authorizationLoader.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject(response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          authorizationLoader.dismiss()
          reject('network error')          
          return []
        }
      )
    })

    return authorizationPromise
  }

  public listWaitingLogs(): Promise<any> {
    let listPromise = new Promise<any>((resolve, reject) => {
      let listLoader = this.loaderService.koiLoader()

      this.server.update(
        'list-waiting-logs-capa-form',
        new FormData(),
        (response: any) => {
          this.toastService.showServerMessage('list-waiting-logs-capa-form', response.meta.return_code)
          listLoader.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject('bad request')
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          listLoader.dismiss()
          reject('network error')          
          return []
        }
      )
    })

    return listPromise
  }

  public deleteFile(id: number): Promise<any> {
    let deleteFilePromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Borrar archivo permanentemente',
        message: 'El archivo PDF que seleccionó para borrar es un archivo que se encuentra en el servidor. Esta acción no se puede deshacer, ¿Está seguro que desea continuar?',
        buttons: [
          {
            text: this.translationService.translate('Options.cancel'),
            handler: () => {
              reject('user_cancel')
            }
          },
          {
            text: this.translationService.translate('Options.accept'),
            handler: () => {
              let deleteFileLoader = this.loaderService.koiLoader()
              let deleteFileForm = new FormData()

              deleteFileForm.append('id', String(id))

              this.server.update(
                'delete-capa-file',
                deleteFileForm,
                (response: any) => {
                  if (response.meta.return_code == 0) {
                    this.toastService.showClientMessage('file-deleted', 0)
                    resolve('server')
                  } else {
                    this.toastService.showServerMessage('delete-capa-file', response.meta.return_code)
                    reject(response.meta.return_code)
                  }
                  deleteFileLoader.dismiss()
                }, (error: any, caught: Observable<void>) => {
                  this.toastService.showClientMessage('server-unreachable', 1)
                  deleteFileLoader.dismiss()
                  reject('network error')
                  return []
                }
              )
            }
          }
        ]
      })
    })

    return deleteFilePromise
  }

  public deleteImage(id: number): Promise<any> {
    let deleteImagePromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Borrar imagen permanentemente',
        message: 'La imagen que seleccionó para borrar es un archivo que se encuentra en el servidor. Esta acción no se puede deshacer, ¿Está seguro que desea continuar?',
        buttons: [
          {
            text: this.translationService.translate('Options.cancel'),
            handler: () => {
              reject('user_cancel')
            }
          },
          {
            text: this.translationService.translate('Options.accept'),
            handler: () => {
              let deleteImageLoader = this.loaderService.koiLoader()
              let deleteImageForm = new FormData()

              deleteImageForm.append('id', String(id))

              this.server.update(
                'delete-capa-image',
                deleteImageForm,
                (response: any) => {
                  if (response.meta.return_code == 0) {
                    this.toastService.showClientMessage('image-deleted', 0)
                    resolve('server')
                  } else {
                    this.toastService.showServerMessage('delete-capa-image', response.meta.return_code)
                    reject(response.meta.return_code)
                  }
                  deleteImageLoader.dismiss()
                }, (error: any, caught: Observable<void>) => {
                  this.toastService.showClientMessage('server-unreachable', 1)
                  deleteImageLoader.dismiss()
                  reject('network error')
                  return []
                }
              )
            }
          }
        ]
      })
    })

    return deleteImagePromise
  }
}