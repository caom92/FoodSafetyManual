import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { BackendService } from '../../../../services/app.backend'
import { LogService } from '../../../../services/app.logs'
import { Log } from '../../../logs/gap-packing-water-resource/interfaces/gap.packing.water.resource.log.interface'
import { SuperCapture } from '../../super-capture/super.capture'

@Component({
  selector: 'gap-packing-water-resource-capture',
  templateUrl: './gap-packing-water-resource-capture.component.html'
})

export class GAPPackingWaterResourceCaptureComponent extends SuperCapture {
  newLog: boolean = null
  logData: Log = null

  constructor(routeState: ActivatedRoute, server: BackendService, sanitizer: DomSanitizer, events: PubSubService, private logService: LogService) {
    super(routeState, server, sanitizer, events)
  }

  public onOpenLog(event) {
    if (event === Number(event)) {
      this.logService.authorization('gap-packing-water-resource', event).then(success => {
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