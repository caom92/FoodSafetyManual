import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService, DefaultLocale } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report, ReportUnitType } from '../interfaces/gap-packing-harvest-block-inspection-report.interface'

@Component({
  selector: 'gap-packing-harvest-block-inspection-report',
  templateUrl: './gap-packing-harvest-block-inspection-report.component.html'
})

export class GAPPackingHarvestBlockInspectionReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @ViewChild('report_body') reportHTML: any
  unitDetails: ReportUnitType = { id: null, name_en: '', name_es: '' }

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public ngOnInit(): void {
    super.ngOnInit()
    let unitTypeIndex = this.report.unit_types[this.report.unit_types.findIndex((x => x.id == this.report.unit_type))]
    if (unitTypeIndex !== undefined) {
      this.unitDetails = this.report.unit_types[this.report.unit_types.findIndex((x => x.id == this.report.unit_type))]
    }
  }

  public getOrientation(): string {
    return 'L'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{width:940px}.questionColumn{width:425px}.answerColumn{width:60px}.commentColumn{width:425px}.numberColumn{width:30px}</style>'
  }
}