import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { BackendService } from '../../../../services/app.backend'
import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gmp-packing-ozone-water/interfaces/gmp.packing.ozone.water.log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gmp-packing-ozone-water-capture',
  templateUrl: './gmp-packing-ozone-water-capture.component.html'
})

export class GMPPackingOzoneWaterCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, server: BackendService, sanitizer: DomSanitizer, events: PubSubService, logService: LogService) {
    super(routeState, server, sanitizer, events, logService)
  }
}