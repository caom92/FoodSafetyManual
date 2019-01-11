import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { BackendService } from '../../../../services/app.backend'
import { LogService } from '../../../../services/app.logs'
import { Log } from '../../../logs/gap-packing-water-resource/interfaces/gap.packing.water.resource.log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gap-packing-water-resource-capture',
  templateUrl: './gap-packing-water-resource-capture.component.html'
})

export class GAPPackingWaterResourceCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, server: BackendService, sanitizer: DomSanitizer, events: PubSubService, logService: LogService) {
    super(routeState, server, sanitizer, events, logService)
  }
}