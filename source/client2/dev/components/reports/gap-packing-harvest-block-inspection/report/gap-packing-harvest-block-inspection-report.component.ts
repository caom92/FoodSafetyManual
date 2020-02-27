import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService, DefaultLocale } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap-packing-harvest-block-inspection-report.interface'

@Component({
  selector: 'gap-packing-harvest-block-inspection-report',
  templateUrl: './gap-packing-harvest-block-inspection-report.component.html'
})

export class GAPPackingHarvestBlockInspectionReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getOrientation(): string {
    return 'L'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{width:940px}.questionColumn{width:425px}.answerColumn{width:60px}.commentColumn{width:425px}.numberColumn{width:30px}</style>'
  }
}