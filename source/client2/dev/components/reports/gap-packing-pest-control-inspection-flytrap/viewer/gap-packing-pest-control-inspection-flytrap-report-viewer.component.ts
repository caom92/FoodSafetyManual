import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { ReportService } from '../../../../services/report.service'
import { DateTimeService } from '../../../../services/time.service'
import { SuperReportViewer } from '../../super-report/super.report.viewer'

@Component({
  selector: 'gap-packing-pest-control-inspection-flytrap-report-viewer',
  templateUrl: 'gap-packing-pest-control-inspection-flytrap-report-viewer.component.html'
})

export class GAPPackingPestControlInspectionFlytrapReportViewerComponent extends SuperReportViewer {
  constructor(routeState: ActivatedRoute,
    formBuilder: FormBuilder,
    reportService: ReportService,
    timeService: DateTimeService) {
    super(routeState, formBuilder, reportService, timeService)
  }
}