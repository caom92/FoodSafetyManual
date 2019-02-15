import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.hand.washing.report.interface'

@Component({
  selector: 'gmp-packing-hand-washing-report',
  templateUrl: './gmp.packing.hand.washing.report.html'
})

export class GMPPackingHandWashingReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TranslationService) {
    super(ts)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{background-color:#D3D3D3;width:631px}.nameColumn{width:531px}.approvedColumn{width:100px}</style>'
  }
}