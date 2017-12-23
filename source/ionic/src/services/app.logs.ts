import { Injectable } from '@angular/core'

import { App, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms'

import { Observable } from 'rxjs/Rx'

import { PendingLog } from '../pages/pending-logs/pending-card/pending.card.interface'

import { ToastService } from './app.toasts'
import { LoaderService } from './app.loaders'
import { BackendService } from './app.backend'
import { LogDetails } from '../pages/logs/log.interfaces';

// Servicio que agrupa las funciones en común que pueden ser utilizadas por
// bitácoras y autorizaciones

@Injectable()
export class LogService {
  constructor(public app: App,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private server: BackendService,
    private storage: Storage,
    private events: Events) {

  }

  processPendingLog(index: number) {
    this.storage.get("user_id").then(user_id => {
      if (user_id != null && user_id != undefined) {
        this.storage.get("pendingLogQueue").then((pending) => {
          if (pending != undefined && pending != null) {
            if (pending[user_id] != null && pending[user_id] != undefined) {
              let logToProcess: PendingLog = pending[user_id][index]
              this.send(logToProcess.log, logToProcess.service, { zone_name: logToProcess.zone_name, program_name: logToProcess.program_name, module_name: logToProcess.module_name, log_name: logToProcess.log_name }, false).then(success => {
                pending[user_id].splice(index, 1)
                this.storage.set("pendingLogQueue", pending)
                this.events.publish("log:resent", index)
              }, error => {
                // TODO: Ni se, en si no tenemos que hacer nada v:
                console.log("fail")
                console.log(error)
              })
            }
          }
        })
      }
    })
  }

  public log(suffix: string): Promise<any> {
    let logPromise = new Promise<any>((resolve, reject) => {
      let logLoader = this.loaderService.koiLoader("")
      
      logLoader.present()
      this.server.update(
        'log-' + suffix,
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              this.storage.set("log-" + suffix, response.data)
              logLoader.dismiss()
            } else {
              reject("bad request")
              logLoader.dismiss()
              this.app.getRootNav().pop()
              this.toastService.showText("serverUnreachable")
            }
          } else {
            reject("bad request")
            logLoader.dismiss()
            this.app.getRootNav().pop()
            this.toastService.showString("Error " + response.meta.return_code + ", server says: " + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject("network error")
          logLoader.dismiss()
          this.app.getRootNav().pop()
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
        if (flatObj[key] == true) {
          form_data.append(key, "1")
        } else if (flatObj[key] == false) {
          form_data.append(key, "0")
        } else {
          form_data.append(key, flatObj[key])
        }
      }

      loader.present()
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
          loader.dismiss()
          console.log(response)
          console.log(JSON.stringify(response))
        }, (error: any, caught: Observable<void>) => {
          if (isFirstTry == true) {
            // Si se trata del primer intento (enviado desde una pantalla de bitácora)
            // es necesario guardar la bitácora en la lista de pendientes
            this.storage.get("pendingLogQueue").then((val) => {
              console.log("Pending queue: ")
              console.log(val)
              let pendingLog: { service: string, log: any, zone_name: string, program_name: string, module_name: string, log_name: string } = { service: null, log: null, zone_name: null, program_name: null, module_name: null, log_name: null }
              pendingLog.service = service
              pendingLog.log = filled_log
              pendingLog.zone_name = details.zone_name
              pendingLog.program_name = details.program_name
              pendingLog.module_name = details.module_name
              pendingLog.log_name = details.log_name
              this.storage.get("user_id").then((user_id) => {
                if (val == null || val == undefined) {
                  let temp = {}
                  temp[user_id] = [pendingLog]
                  this.storage.set("pendingLogQueue", temp)
                  this.events.publish("pendingLog:total", 1)
                } else {
                  if (Array.isArray(val[user_id])) {
                    val[user_id].push(pendingLog)
                    this.storage.set("pendingLogQueue", val)
                    this.events.publish("pendingLog:total", val[user_id].length)
                  } else {
                    val[user_id] = [pendingLog]
                    this.storage.set("pendingLogQueue", val)
                    this.events.publish("pendingLog:total", 1)
                  }
                }
              })
            })
            loader.dismiss()
            this.toastService.showText("failedLogToQueue")
            resolve("local")
          } else {
            // Caso contrario, se rechaza junto con el error devuelto por la petición HTTP
            loader.dismiss()
            reject(error)
          }
          return []
        }
      )
    })

    return sentPromise
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

      loader.present()
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
          loader.dismiss()
          console.log(response)
          console.log(JSON.stringify(response))
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