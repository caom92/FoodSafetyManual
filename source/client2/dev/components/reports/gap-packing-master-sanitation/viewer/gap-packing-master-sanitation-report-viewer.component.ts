import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { ReportService } from '../../../../services/report.service'
import { DateTimeService } from '../../../../services/time.service'
import { SuperReportViewer } from '../../super-report/super.report.viewer'

@Component({
  selector: 'gap-packing-master-sanitation-report-viewer',
  templateUrl: 'gap-packing-master-sanitation-report-viewer.component.html'
})

export class GAPPackingMasterSanitationReportViewerComponent extends SuperReportViewer {
  constructor(routeState: ActivatedRoute,
    formBuilder: FormBuilder,
    reportService: ReportService,
    timeService: DateTimeService) {
    super(routeState, formBuilder, reportService, timeService)
  }
}
