import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'
import { BackendService } from '../../../../services/app.backend'

import { SuperCapture } from '../../super-capture/super.capture'

@Component({
  selector: 'gmp-packing-glass-brittle-capture',
  templateUrl: './gmp-packing-glass-brittle-capture.component.html'
})

export class GMPPackingGlassBrittleCaptureComponent extends SuperCapture {
  constructor(routeState: ActivatedRoute, server: BackendService, sanitizer: DomSanitizer, events: PubSubService) {
    super(routeState, server, sanitizer, events)
  }
}