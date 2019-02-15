import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.self.inspection.pest.control.report.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-report',
  templateUrl: './gmp.self.inspection.pest.control.report.html'
})

export class GMPSelfInspectionPestControlReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.even{background-color:#b8e0b9}.typeTitle{background-color:yellow;width:588px}.fullColumn{background-color:#D3D3D3;width:631px}.numberColumn{width:47px}.areaColumn{width:195px}.securedColumn{width:75px}.statusColumn{width:100px}.activityColumn{width:70px}.actionColumn{width:144px}</style>'
  }
}