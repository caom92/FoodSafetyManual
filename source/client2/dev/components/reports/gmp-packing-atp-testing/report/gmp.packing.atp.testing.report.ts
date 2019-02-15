import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.atp.testing.report.interface'

@Component({
  selector: 'gmp-packing-atp-testing-report',
  templateUrl: './gmp.packing.atp.testing.report.html'
})

export class GMPPackingATPTestingReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TranslationService) {
    super(ts)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{width:631px}.timeColumn{width:40px;}.testColumn{width:57px;}.resultColumn{width:75px;}.areaColumn{width:177px;}.actionColumn{width:150px;}</style>'
  }
}