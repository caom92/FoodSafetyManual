import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { BackendService } from '../../../../services/app.backend'
import { LoaderService } from '../../../../services/app.loaders'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperReportViewer } from '../../super-report/super.report.viewer'

@Component({
  selector: 'gmp-packing-cold-room-temp-report-viewer',
  templateUrl: 'gmp.packing.cold.room.temp.report.viewer.component.html'
})

export class GMPPackingColdRoomTempReportViewerComponent extends SuperReportViewer {
  constructor(routeState: ActivatedRoute,
    server: BackendService,
    formBuilder: FormBuilder,
    loaderService: LoaderService,
    toastService: ToastsService) {
    super(routeState, server, formBuilder, loaderService, toastService)
  }
}