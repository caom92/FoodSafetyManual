import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.preop.interface'
import { Preview } from '../../preview/report.preview.interface';

@Component({
  selector: 'gmp-packing-preop-report',
  templateUrl: './gmp.packing.preop.report.html'
})

export class GMPPackingPreopReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
  }

  public getPreview(): Array<Preview> {
    let preview: Array<Preview> = []

    if (this.report.notes != null && this.report.notes != "") {
      preview.push({ title: "Log.notes", content: this.report.notes })
    }

    if (this.report.album_url != null && this.report.album_url != "") {
      preview.push({ title: "Log.album_url", content: this.report.album_url })
    }

    if (preview.length == 0) {
      preview = null
    }

    preview = null

    return preview
  }

  public getCSS(): string {
    return "<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.verticaltext{ writing-mode:tb-rl; transform: rotate(90deg); white-space:nowrap; word-break:break-word; bottom:0;}.typeTitle{ background-color: yellow; width:501px;}.fullColumn{ background-color: #D3D3D3;width:631px;}.nameColumn{ width:166px;}.numberColumn{ width:30px;}.timeColumn{ width:40px;}.areaColumn{ width:90px;}.statusColumn{ width:85px;}.actionColumn{ width:70px;}.commentColumn{ width:150px;}</style>"
  }
}