import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'
import { BackendService } from '../../../../services/app.backend'

import { SuperCapture } from '../../super-capture/super.capture'

@Component({
  selector: 'gap-doc-control-doc-control-capture',
  templateUrl: './gap-doc-control-doc-control-capture.component.html'
})

export class GAPDocControlDocControlCaptureComponent extends SuperCapture {
  constructor(routeState: ActivatedRoute, server: BackendService, sanitizer: DomSanitizer, events: PubSubService) {
    super(routeState, server, sanitizer, events)
  }
}