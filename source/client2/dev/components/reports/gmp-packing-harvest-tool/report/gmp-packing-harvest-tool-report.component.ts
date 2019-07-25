import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp-packing-harvest-tool-report.interface'

@Component({
  selector: 'gmp-packing-harvest-tool-report',
  templateUrl: './gmp-packing-harvest-tool-report.component.html'
})

export class GMPPackingHarvestToolReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getOrientation(): string {
    return 'L'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.timeColumn{width:40px}.quantityColumn{width:40px}.conditionsColumn{width:85px}.issueColumn{width:165px}.recoveryColumn{width:165px}.toolColumn{width:65px}.dateColumn{width:80px}.sanitationColumn{width:85px}.deficienciesColumn{width:190px}.actionColumn{width:190px}</style>'
  }
}