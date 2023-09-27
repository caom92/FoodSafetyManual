import { Component, Input } from '@angular/core'

import { ReportItem } from '../interfaces/gap-packing-cooler-cleaning-report.interface'

@Component({
  selector: '[gap-packing-cooler-cleaning-report-item]',
  templateUrl: './gap-packing-cooler-cleaning-report-item.component.html'
})

export class GAPPackingCoolerCleaningReportItemComponent {
  @Input() item: ReportItem

  constructor() {
  }
}
