import { Component, Input } from '@angular/core'

import { ReportItem } from '../interfaces/gap-packing-master-sanitation-report.interface'

@Component({
  selector: '[gap-packing-master-sanitation-report-item]',
  templateUrl: './gap-packing-master-sanitation-report-item.component.html'
})

export class GAPPackingMasterSanitationReportItemComponent {
  @Input() item: ReportItem

  constructor() {

  }
}
