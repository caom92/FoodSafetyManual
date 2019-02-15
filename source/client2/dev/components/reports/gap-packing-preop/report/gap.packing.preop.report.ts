import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap.packing.preop.report.interface'

@Component({
  selector: 'gap-packing-preop-report',
  templateUrl: './gap.packing.preop.report.html'
})

export class GAPPackingPreopReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.even{background-color:#b8e0b9}.verticaltext{writing-mode:tb-rl;transform:rotate(90deg);white-space:nowrap;word-break:break-word;bottom:0}.typeTitle{background-color:yellow;width:501px}.fullColumn{background-color:#D3D3D3;width:631px}.nameColumn{width:166px}.numberColumn{width:30px}.timeColumn{width:40px}.areaColumn{width:90px}.statusColumn{width:85px}.actionColumn{width:70px}.commentColumn{width:150px}</style>'
  }
}