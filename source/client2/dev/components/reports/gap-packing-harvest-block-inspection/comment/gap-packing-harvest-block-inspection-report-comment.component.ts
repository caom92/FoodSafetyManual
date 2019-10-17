import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gap-packing-harvest-block-inspection-report.interface'

@Component({
  selector: '[gap-packing-harvest-block-inspection-report-comment]',
  templateUrl: './gap-packing-harvest-block-inspection-report-comment.component.html'
})

export class GAPPackingHarvestBlockInspectionReportCommentComponent {
  @Input() item: ReportItem
  @Language() lang: string

  constructor() {

  }
}