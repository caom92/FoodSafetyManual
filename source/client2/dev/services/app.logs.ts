import { Injectable } from '@angular/core'

import { PubSubService } from 'angular2-pubsub'

import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms'

import { Observable } from 'rxjs/Rx'

//import { PendingLog } from '../pages/pending-logs/pending-card/pending.card.interface'

import { ToastsService } from './app.toasts'
import { LoaderService } from './app.loaders'
import { BackendService } from './app.backend'
import { LogDetails } from '../components/logs/log.interfaces'

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
    private events: PubSubService) {

  }

  public log(suffix: string): Promise<any> {
    let logPromise = new Promise<any>((resolve, reject) => {
      let logLoader = this.loaderService.koiLoader("")

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
      let loader = this.loaderService.koiLoader("")
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
          loader.close()
          this.toastService.showText("failedLogToQueue")
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
      let authorizationLoader = this.loaderService.koiLoader("")
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
              //this.app.getRootNav().pop()
              this.toastService.showText("serverUnreachable")
            }
          } else {
            reject("bad request")
            authorizationLoader.close()
            //this.app.getRootNav().pop()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject("network error")
          authorizationLoader.close()
          //this.app.getRootNav().pop()
          this.toastService.showText("serverUnreachable")
          return []
        }
      )
    })

    return authorizationPromise
  }

  update(data: any, service: string) {
    let updatePromise = new Promise<string>((resolve, reject) => {
      let loader = this.loaderService.koiLoader("")
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
          // TODO Mensaje de error
          reject()
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
}
