import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { ReportService } from '../../../../services/report.service'
import { DateTimeService } from '../../../../services/time.service'
import { SuperReportViewer } from '../../super-report/super.report.viewer'

@Component({
  selector: 'gmp-packing-harvest-tool-report-viewer',
  templateUrl: 'gmp-packing-harvest-tool-report-viewer.component.html'
})

export class GMPPackingHarvestToolReportViewerComponent extends SuperReportViewer {
  constructor(routeState: ActivatedRoute, formBuilder: FormBuilder, reportService: ReportService, timeService: DateTimeService) {
    super(routeState, formBuilder, reportService, timeService)
  }
}