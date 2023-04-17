import { Component, Input } from '@angular/core'

import { ReportType } from '../interfaces/gap-packing-master-sanitation-report.interface'

@Component({
  selector: '[gap-packing-master-sanitation-report-type]',
  templateUrl: './gap-packing-master-sanitation-report-type.component.html'
})

export class GAPPackingMasterSanitationReportTypeComponent {
  @Input() type: ReportType

  constructor() {

  }
}
