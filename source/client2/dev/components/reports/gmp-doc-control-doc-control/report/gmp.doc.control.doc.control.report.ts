import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.doc.control.doc.control.report.interface'

@Component({
  selector: 'gmp-doc-control-doc-control-report',
  templateUrl: './gmp.doc.control.doc.control.report.html'
})

export class GMPDocControlDocControlReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any
  entry = null

  constructor() {
    super()
  }

  ngOnInit() {
    try {
      this.report.reports.document.entries.pictures = JSON.parse(this.report.reports.document.entries.pictures)
    } catch (err) {
      this.report.reports.document.entries.pictures = null
    }

    try {
      this.report.reports.document.entries.files = JSON.parse(this.report.reports.document.entries.files)
    } catch (err) {
      this.report.reports.document.entries.files = null
    }

    this.entry = true
    super.ngOnInit()
  }

  public getImages(): string {
    let temp = []
    if (this.report.reports.document.entries.pictures != null) {
      for (let image of this.report.reports.document.entries.pictures) {
        temp.push("http://localhost/espresso/data/images/gmp/doc_control/doc_control/" + image)
      }
      return JSON.stringify(temp)
    }
    
    return ""
  }

  public getCSS(): string {
    return "<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.verticaltext{ writing-mode:tb-rl; transform: rotate(90deg); white-space:nowrap; word-break:break-word; bottom:0;}.typeTitle{ background-color: yellow; width:501px;}.fullColumn{ background-color: #D3D3D3;width:631px;}.nameColumn{ width:116px;}.numberColumn{ width:30px;}.timeColumn{ width:40px;}.areaColumn{ width:90px;}.statusColumn{ width:85px;}.actionColumn{ width:70px;}.commentColumn{ width:200px;} .report_image{width:350px !important; padding-left: 140px;}</style>"
  }
}