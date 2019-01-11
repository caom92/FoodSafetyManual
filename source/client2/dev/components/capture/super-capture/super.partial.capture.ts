import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { BackendService } from '../../../services/app.backend'
import { LogService } from '../../../services/app.logs'
import { SuperLog } from '../../logs/super-logs/super.logs.log.interface'
import { SuperCapture } from './super.capture'

export class SuperPartialCapture extends SuperCapture {
  newLog: boolean = null
  logData: SuperLog = null

  constructor(routeState: ActivatedRoute, server: BackendService, sanitizer: DomSanitizer, events: PubSubService, private logService: LogService) {
    super(routeState, server, sanitizer, events)
  }

  public onOpenLog(event) {
    if (event === Number(event)) {
      this.logService.authorization(this.suffix, event).then(success => {
        this.logData = success
        this.newLog = true
      })
    } else {
      this.newLog = true
    }
  }

  public onCloseLog(event) {
    this.logData = null
    this.newLog = null
  }
}