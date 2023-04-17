import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap-packing-master-sanitation-report.interface'

@Component({
  selector: 'gap-packing-master-sanitation-report',
  templateUrl: './gap-packing-master-sanitation-report.component.html'
})

export class GAPPackingMasterSanitationReportComponent extends SuperReportComponent {
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
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{background-color:#D3D3D3;width:940px}.areaColumn{width:100px}.timeColumn{width:40px}.typeTitle{background-color:yellow;width:800px}.nameColumn{width:410px}.statusColumn{width:90px}.actionColumn{width:150px}.commentColumn{width:150px}</style>'
  }
}
