import { Injectable } from '@angular/core'

import { Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Observable } from 'rxjs/Rx'

import { ToastService } from './app.toasts'
import { LoaderService } from './app.loaders'
import { BackendService } from './app.backend'

// Servicio que agrupa las funciones en común que pueden ser utilizadas por
// bitácoras y autorizaciones

@Injectable()
export class LogService {
  constructor(private loaderService: LoaderService,
    private toastService: ToastService,
    private server: BackendService,
    private storage: Storage,
    private events: Events) {

  }

  send(data: any, service: string, details: { zone_name: string, program_name: string, module_name: string, log_name: string }) {
    let sentPromise = new Promise<string>((resolve, reject) => {
      let loader = this.loaderService.koiLoader("")
      let form_data = new FormData()
      let filled_log = data

      let flatObj = this.flatten(filled_log)

      for (let key in flatObj) {
        let tempKey = key + "]"
        tempKey = tempKey.replace(']', '')
        if (flatObj[key] == true) {
          form_data.append(tempKey, "1")
        } else if (flatObj[key] == false) {
          form_data.append(tempKey, "0")
        } else {
          form_data.append(tempKey, flatObj[key])
        }
      }

      loader.present()
      this.server.update(
        service,
        form_data,
        (response: any) => {
          //this.resetForm()
          loader.dismiss()
          this.toastService.showText("capturedLog")
          resolve("server")
          console.log(response)
          console.log(JSON.stringify(response))
        }, (error: any, caught: Observable<void>) => {
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
          //this.resetForm()
          loader.dismiss()
          this.toastService.showText("failedLogToQueue")
          resolve("local")
          return []
        }
      )
    })

    return sentPromise
  }

  // Esta función "aplana" y da formato de datos de formulario a un objeto
  // producido por cualquier componente de una bitácora particular
  private flatten(data) {
    var result = {}

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "][" + i + "][")
        if (l == 0) result[prop] = []
      } else {
        var isEmpty = true
        for (var p in cur) {
          isEmpty = false
          recurse(cur[p], prop ? prop + p : p)
        }
        if (isEmpty && prop) result[prop] = {}
      }
    }

    recurse(data, "")
    return result
  }
}