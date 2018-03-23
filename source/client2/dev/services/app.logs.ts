import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { PubSubService } from 'angular2-pubsub'
import { Observable } from 'rxjs/Rx'

import { LogDetails } from '../components/logs/log.interfaces'
import { AlertController } from './alert/app.alert'
import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { DateTimeService } from './app.time'
import { ToastsService } from './app.toasts'
import { TranslationService as TService } from 'angular-l10n'

/**
 * LogService, también referido como el servicio de bitácoras, es el servicio
 * encargado de realizar las peticiones al servidor relacionadas con las
 * bitácoras, tanto las enviadas por empleados como aquellas modificadas por los
 * supervisores previo a su autorización
 * 
 * @export
 * @class LogService
 */

@Injectable()
export class LogService {
  constructor(private loaderService: LoaderService,
    private toastService: ToastsService,
    private server: BackendService,
    private events: PubSubService,
    private timeService: DateTimeService,
    private alertCtrl: AlertController,
    private ts: TService) {

  }

  public log(suffix: string): Promise<any> {
    let logPromise = new Promise<any>((resolve, reject) => {
      let logLoader = this.loaderService.koiLoader()

      this.server.update(
        'log-' + suffix,
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              logLoader.close()
            } else {
              reject("bad request")
              logLoader.close()
              this.toastService.showText("serverUnreachable")
            }
          } else {
            reject("bad request")
            logLoader.close()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject("network error")
          logLoader.close()
          this.toastService.showText("serverUnreachable")
          return []
        }
      )
    })

    return logPromise
  }

  public send(data: any, service: string, details: LogDetails, isFirstTry: boolean = true): Promise<string> {
    let sentPromise = new Promise<string>((resolve, reject) => {
      let loader = this.loaderService.koiLoader()
      let form_data = new FormData()
      let filled_log = data

      let flatObj = this.flatten(filled_log)

      for (let key in flatObj) {
        if (flatObj[key] === true) {
          form_data.append(key, "1")
        } else if (flatObj[key] === false) {
          form_data.append(key, "0")
        } else {
          form_data.append(key, flatObj[key])
        }
      }

      this.server.update(
        service,
        form_data,
        (response: any) => {
          if (response.meta.return_code == 0) {
            this.toastService.showText("capturedLog")
            resolve("server")
          } else {
            // TODO: Toast para caso en que haya fallado
            // Regresamos la promesa como erronea con el código de error del servidor
            reject(response.meta.return_code)
          }
          // Sin importar el resultado, desactivamos el spinner
          loader.close()
        }, (error: any, caught: Observable<void>) => {
          //this.toastService.showText("failedLogToQueue")
          this.toastService.showText("serverUnreachable")
          loader.close()
          reject(error)
          return []
        }
      )
    })

    return sentPromise
  }

  /**
   * Solicita al servidor un reporte de autorización, el cual contiene el estado
   * de una bitácora enviada por un empleado en espera por la aprobación de un
   * supervisor.
   * 
   * Utilización:
   * 
   * ```ts
   * // Añadir servicio en el constructor
   * 
   * constructor(private logService: LogService){
   * }
   * 
   * // Para realizar una solicitud de reporte de autorización
   * 
   * this.logService.authorization(suffix, report_id).then(success => {
   * 
   * }, error => {
   * 
   * })
   * 
   * ```
   * 
   * @param {string} suffix - El sufijo de la bitácora a solicitar
   * @param {number} report_id - El ID del reporte a solicitar
   * @returns {Promise<any>}
   * @memberof LogService
   */

  public authorization(suffix: string, report_id: number): Promise<any> {
    let authorizationPromise = new Promise<any>((resolve, reject) => {
      let authorizationLoader = this.loaderService.koiLoader()
      let authorizationForm = new FormData()

      authorizationForm.append("report_id", String(report_id))

      this.server.update(
        'authorization-report-' + suffix,
        authorizationForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              authorizationLoader.close()
            } else {
              reject("bad request")
              authorizationLoader.close()
              this.toastService.showText("serverUnreachable")
            }
          } else {
            reject("bad request")
            authorizationLoader.close()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject("network error")
          authorizationLoader.close()
          this.toastService.showText("serverUnreachable")
          return []
        }
      )
    })

    return authorizationPromise
  }

  public approve(logID: number): Promise<any> {
    let approvePromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: "Aprobar bitácora",//this.ts.translate("Titles.add_item"),
        message: "¿Está seguro que desea aprobar esta bitácora? Esta acción no se puede deshacer",//this.ts.translate("Messages.add_item"),
        buttons: [
          {
            text: this.ts.translate("Options.cancel"),
            handler: () => {
              // TODO: Toast de acción cancelada por el usuario
              reject("user_cancel")
              console.log('Cancelar')
            }
          },
          {
            text: this.ts.translate("Options.accept"),
            handler: () => {
              let approveLoader = this.loaderService.koiLoader("Aprobando bitácora...")
              let approveForm = new FormData()

              approveForm.append("captured_log_id", logID.toString())
              approveForm.append("date", this.timeService.getISODate(new Date()))

              this.server.update(
                'approve-log',
                approveForm,
                (response: any) => {
                  if (response.meta.return_code == 0) {
                    resolve(response.data)
                    approveLoader.close()
                  } else {
                    reject("bad request")
                    approveLoader.close()
                    this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
                  }
                }, (error: any, caught: Observable<void>) => {
                  reject("network error")
                  approveLoader.close()
                  this.toastService.showText("serverUnreachable")
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

  public reject(logID: number): Promise<any> {
    let rejectPromise = new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: "Rechazar bitácora",//this.ts.translate("Titles.add_item"),
        message: "¿Está seguro que desea rechazar esta bitácora? Esta acción no se puede deshacer",//this.ts.translate("Messages.add_item"),
        buttons: [
          {
            text: this.ts.translate("Options.cancel"),
            handler: () => {
              // TODO: Toast de acción cancelada por el usuario
              reject("user_cancel")
              console.log('Cancelar')
            }
          },
          {
            text: this.ts.translate("Options.accept"),
            handler: () => {
              let rejectLoader = this.loaderService.koiLoader("Rechazando bitácora...")
              let rejectForm = new FormData()

              rejectForm.append("captured_log_id", logID.toString())

              this.server.update(
                'reject-log',
                rejectForm,
                (response: any) => {
                  if (response.meta.return_code == 0) {
                    // TODO: Toast de rechazo exitoso, regresar a la página de autorizaciones
                    resolve(response.data)
                    rejectLoader.close()
                  } else {
                    reject("bad request")
                    rejectLoader.close()
                    this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
                  }
                }, (error: any, caught: Observable<void>) => {
                  reject("network error")
                  rejectLoader.close()
                  this.toastService.showText("serverUnreachable")
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

  public update(data: any, service: string): Promise<string> {
    let updatePromise = new Promise<string>((resolve, reject) => {
      let loader = this.loaderService.koiLoader()
      let form_data = new FormData()
      let filled_log = data

      let flatObj = this.flatten(filled_log)

      for (let key in flatObj) {
        if (flatObj[key] === true) {
          form_data.append(key, "1")
        } else if (flatObj[key] === false) {
          form_data.append(key, "0")
        } else {
          form_data.append(key, flatObj[key])
        }
      }

      this.server.update(
        service,
        form_data,
        (response: any) => {
          if (response.meta.return_code == 0) {
            this.toastService.showText("updatedLog")
            resolve("server")
          } else {
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
            reject(response.meta.return_code)
          }
          loader.close()
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showText("serverUnreachable")
          loader.close()
          reject("network error")
          return []
        }
      )
    })

    return updatePromise
  }

  // https://stackoverflow.com/questions/43551221/angular-2-mark-nested-formbuilder-as-touched
  setAsDirty(group: FormGroup | FormArray) {
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

  // Esta función "aplana" y da formato de datos de formulario a un objeto
  // producido por cualquier componente de una bitácora particular

  // https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
  private flatten(data) {
    let result = {}

    function recurse(value, key) {
      if (Object(value) !== value) {
        result[key] = value
      } else if (Array.isArray(value)) {
        for (var i = 0, l = value.length; i < l; i++)
          recurse(value[i], key + "[" + i + "]")
        if (l == 0) result[key] = []
      } else {
        var isEmpty = true
        for (var k in value) {
          isEmpty = false
          recurse(value[k], key ? key + "[" + k + "]" : k)
        }
        if (isEmpty && key) result[key] = {}
      }
    }

    if (Object(data) !== data) {
      throw Error("Non-object parameter can't be flattened")
    } else {
      recurse(data, "")
    }

    return result
  }

  resolveBackendString(input: string | number): string {
    if (typeof input === "number") {
      return (input !== null && input !== undefined && Number.isNaN(input) !== true) ? String(input) : ""
    } else {
      return (input !== null && input !== undefined) ? String(input) : ""
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
