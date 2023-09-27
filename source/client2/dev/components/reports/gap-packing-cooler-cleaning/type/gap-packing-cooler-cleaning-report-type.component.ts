import { Component, Input } from '@angular/core'

import { ReportType } from '../interfaces/gap-packing-cooler-cleaning-report.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-report-type]',
  templateUrl: './gap-packing-cooler-cleaning-report-type.component.html'
})

export class GAPPackingCoolerCleaningReportTypeComponent {
  @Input() type: ReportType

  constructor() {

  }
}
