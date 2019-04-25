import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.atp.luminometer.report.interface'

@Component({
  selector: 'gmp-packing-atp-luminometer-report',
  templateUrl: './gmp.packing.atp.luminometer.report.html'
})

export class GMPPackingATPLuminometerReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.instrumentColumn{width:90px}.weekColumn{width:75px}.typeColumn{width:95px}.numberColumn{width:20px}.testColumn{width:60px}.notesColumn{width:290px}</style>'
  }
}