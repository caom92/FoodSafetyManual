import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap.packing.water.resource.report.interface'

@Component({
  selector: 'gap-packing-water-resource-report',
  templateUrl: './gap.packing.water.resource.report.html'
})

export class GAPPackingWaterResourceReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TService) {
    super(ts)
  }

  public getCSS(): string {
    return '<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td {border: 1px solid #000000;text-align: left;}th {border: 1px solid #000000;text-align: left;font-weight: bold;background-color: #4CAF50;}.fullColumn {background-color: #D3D3D3;width: 631px;}.nameColumn {width: 150px;}.dateColumn {width: 80px;}.complianceColumn {width: 120px;}.actionColumn {width: 281px;}</style>'
  }
}