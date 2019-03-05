import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { TranslationService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { LogDetails } from '../components/logs/log.interfaces'
import { AlertController } from './alert/app.alert'
import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { ToastsService } from './app.toasts'
import { FlattenService } from './flatten.service'
import { DateTimeService } from './time.service'

@Injectable()
export class LogService {
  constructor(private loaderService: LoaderService,
    private flattenService: FlattenService,
    private toastService: ToastsService,
    private server: BackendService,
    private timeService: DateTimeService,
    private alertCtrl: AlertController,
    private translationService: TranslationService) {

  }

  public log(suffix: string): Promise<any> {
    let logPromise = new Promise<any>((resolve, reject) => {
      let logLoader = this.loaderService.koiLoader()

      this.server.update(
        'log-' + suffix,
        new FormData(),
        (response: any) => {
          this.toastService.showServerMessage('log-' + suffix, response.meta.return_code)
          logLoader.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject('bad request')
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          logLoader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return logPromise
  }

  public send(data: Object, suffix: string, details: LogDetails, isFirstTry: boolean = true): Promise<string> {
    let sentPromise = new Promise<string>((resolve, reject) => {
      let loader = this.loaderService.koiLoader()
      let captureForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))

      this.server.update(
        'capture-' + suffix,
        captureForm,
        (response: any) => {
          this.toastService.showServerMessage('capture-' + suffix, response.meta.return_code)
          loader.dismiss()
          if (response.meta.return_code == 0) {
            resolve('server')
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

    return sentPromise
  }

  public listWaitingLogs(suffix: string): Promise<any> {
    let listPromise = new Promise<any>((resolve, reject) => {
      let listLoader = this.loaderService.koiLoader()

      this.server.update(
        'list-waiting-logs-' + suffix,
        new FormData(),
        (response: any) => {
          this.toastService.showServerMessage('list-waiting-logs-' + suffix, response.meta.return_code)
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

  public authorization(suffix: string, report_id: number): Promise<any> {
    let authorizationPromise = new Promise<any>((resolve, reject) => {
      let authorizationLoader = this.loaderService.koiLoader()
      let authorizationForm = new FormData()

      authorizationForm.append('report_id', String(report_id))

      this.server.update(
        'authorization-report-' + suffix,
        authorizationForm,
        (response: any) => {
          this.toastService.showServerMessage('authorization-report-' + suffix, response.meta.return_code)
          authorizationLoader.dismiss()
          if (response.meta.return_code == 0) {
            resolve(response.data)
          } else {
            reject('bad request')
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

  public approve(logID: number): Promise<any> {
    let approvePromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Aprobar bitácora',//this.translationService.translate('Titles.add_item'),
        message: '¿Está seguro que desea aprobar esta bitácora? Esta acción no se puede deshacer',//this.translationService.translate('Messages.add_item'),
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
              let approveLoader = this.loaderService.koiLoader('Aprobando bitácora...')
              let approveForm = new FormData()

              approveForm.append('captured_log_id', logID.toString())
              approveForm.append('date', this.timeService.getISODate())

              this.server.update(
                'approve-log',
                approveForm,
                (response: any) => {
                  this.toastService.showServerMessage('approve-log', response.meta.return_code)
                  approveLoader.dismiss()
                  if (response.meta.return_code == 0) {
                    resolve(response.data)
                  } else {
                    reject('bad request')
                  }
                }, (error: any, caught: Observable<void>) => {
                  this.toastService.showClientMessage('server-unreachable', 1)
                  approveLoader.dismiss()
                  reject('network error')
                  return []
                }
              )
            }
          }
        ]
      })
    })
    
    return approvePromise
  }

  public retreat(logID: number): Promise<any> {
    let retreatPromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Retroceder bitácora',
        message: '¿Está seguro que desea regresar bitácora para ser revisada nuevamente por un supervisor? Esta acción no se puede deshacer',
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
              let retreatLoader = this.loaderService.koiLoader('Retrocediendo bitácora...')
              let retreatForm = new FormData()

              retreatForm.append('captured_log_id', logID.toString())

              this.server.update(
                'retreat-log',
                retreatForm,
                (response: any) => {
                  this.toastService.showServerMessage('retreat-log', response.meta.return_code)
                  retreatLoader.dismiss()
                  if (response.meta.return_code == 0) {
                    resolve(response.data)
                  } else {
                    reject('bad request')
                  }
                }, (error: any, caught: Observable<void>) => {
                  this.toastService.showClientMessage('server-unreachable', 1)
                  retreatLoader.dismiss()
                  reject('network error')
                  return []
                }
              )
            }
          }
        ]
      })
    })

    return retreatPromise
  }

  public reject(logID: number): Promise<any> {
    let rejectPromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Rechazar bitácora',//this.translationService.translate('Titles.add_item'),
        message: '¿Está seguro que desea rechazar esta bitácora? Esta acción no se puede deshacer',//this.translationService.translate('Messages.add_item'),
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
              let rejectLoader = this.loaderService.koiLoader('Rechazando bitácora...')
              let rejectForm = new FormData()

              rejectForm.append('captured_log_id', logID.toString())

              this.server.update(
                'reject-log',
                rejectForm,
                (response: any) => {
                  this.toastService.showServerMessage('reject-log', response.meta.return_code)
                  rejectLoader.dismiss()
                  if (response.meta.return_code == 0) {
                    resolve(response.data)
                  } else {
                    reject('bad request')
                  }
                }, (error: any, caught: Observable<void>) => {
                  this.toastService.showClientMessage('server-unreachable', 1)
                  rejectLoader.dismiss()
                  reject('network error')
                  return []
                }
              )
            }
          }
        ]
      })
    })

    return rejectPromise
  }

  public finish(logID: number): Promise<any> {
    let finishPromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Finalizar bitácora',
        message: '¿Está seguro que desea finalizar esta bitácora para ser enviada a revisión por un supervisor? Esta acción no se puede deshacer',
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
              let finishLoader = this.loaderService.koiLoader('Finalizando bitácora...')
              let finishForm = new FormData()

              finishForm.append('captured_log_id', logID.toString())

              this.server.update(
                'finish-log',
                finishForm,
                (response: any) => {
                  this.toastService.showServerMessage('finish-log', response.meta.return_code)
                  finishLoader.dismiss()
                  if (response.meta.return_code == 0) {
                    resolve(response.data)
                  } else {
                    reject('bad request')
                  }
                }, (error: any, caught: Observable<void>) => {
                  this.toastService.showClientMessage('server-unreachable', 1)
                  finishLoader.dismiss()
                  reject('network error')
                  return []
                }
              )
            }
          }
        ]
      })
    })

    return finishPromise
  }

  public update(data: Object, suffix: string): Promise<string> {
    let updatePromise = new Promise<string>((resolve, reject) => {
      let loader = this.loaderService.koiLoader()
      let updateForm = this.flattenService.formDataFromFlatObject(this.flattenService.flatten(data))      

      this.server.update(
        'update-' + suffix,
        updateForm,
        (response: any) => {
          this.toastService.showServerMessage('update-' + suffix, response.meta.return_code)
          loader.dismiss()
          if (response.meta.return_code == 0) {
            resolve('server')
          } else {            
            reject(response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          loader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return updatePromise
  }

  public uploadManual(suffix: string, manual: FileList): Promise<any> {
    let uploadPromise = new Promise<any>((resolve, reject) => {
      let uploadLoader = this.loaderService.koiLoader()
      
      let manualForm = new FormData()

      if (manual !== undefined && manual !== null) {
        manualForm.append('manual_file', manual[0], manual[0].name)
      }

      this.server.update(
        'upload-manual-' + suffix,
        manualForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            resolve('success')
            uploadLoader.dismiss()
          } else {
            reject('bad request')
            uploadLoader.dismiss()
            this.toastService.showServerMessage('upload-manual-' + suffix, response.meta.return_code)
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          uploadLoader.dismiss()
          reject('network error')
          return []
        }
      )
    })

    return uploadPromise
  }

  // https://stackoverflow.com/questions/43551221/angular-2-mark-nested-formbuilder-as-touched
  public setAsDirty(group: FormGroup | FormArray) {
    group.markAsDirty()
    for (let i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty()
      } else {
        this.setAsDirty(group.controls[i])
      }
    }
  }

  refreshFormGroup(group: FormGroup | FormArray) {
    group.updateValueAndValidity()
    for (let i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].updateValueAndValidity()
      } else {
        this.refreshFormGroup(group.controls[i])
      }
    }
  }

  resolveBackendString(input: string | number): string {
    if (typeof input === 'number') {
      return (input !== null && input !== undefined && Number.isNaN(input) !== true) ? String(input) : ''
    } else {
      return (input !== null && input !== undefined) ? String(input) : ''
    }
  }

  resolveBackendBoolean(input: string | number): boolean {
    return (input !== null && input !== undefined) ? (Number(input) === 1) ? true : (Number(input) === 0) ? false : null : null
  }

  resolveBackendCheckboxBoolean(input: string | number): boolean {
    return (input !== null && input !== undefined) ? (Number(input) === 1) ? true : (Number(input) === 0) ? false : null : (input === null) ? false : null
  }

  resolveBackendNumber(input: string | number): number {
    return (!Number.isNaN(Number(input)) && input !== null && input !== undefined) ? Number(input) : null
  }
}
