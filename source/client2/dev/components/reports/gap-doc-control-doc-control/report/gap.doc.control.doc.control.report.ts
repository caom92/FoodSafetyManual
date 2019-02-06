import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'

import { Preview } from '../../report-common/report-preview/report-preview.interface'
import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap.doc.control.doc.control.report.interface'

@Component({
  selector: 'gap-doc-control-doc-control-report',
  templateUrl: './gap.doc.control.doc.control.report.html'
})

export class GAPDocControlDocControlReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any
  entry = null

  constructor(ts: TService) {
    super(ts)
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

  public getPreview(): Array<Preview> {
    let preview: Array<Preview> = []
    let content: string = ''

    /*let items = ''
    for (let entry of this.report.reports.document.entries.employee) {
      items += entry.product + ", "
    }

    if (items != '') {
      items = items.substring(0, items.length - 2)
    }*/

    if (this.report.reports.document.entries.employee != null &&
      this.report.reports.document.entries.employee != undefined &&
      this.report.reports.document.entries.employee != '') {
      content = content + this.report.reports.document.entries.employee
    }

    if (this.report.reports.document.entries.notes != null &&
      this.report.reports.document.entries.notes != undefined &&
      this.report.reports.document.entries.notes != '') {
      if (content != '') {
        content = content + " | "
      }
      content = content + this.report.reports.document.entries.notes
    }

    preview.push({ title: null, content: content })

    return preview
    //return null
  }

  public getImages(): string {
    let temp = []
    if (this.report.reports.document.entries.pictures != null) {
      for (let image of this.report.reports.document.entries.pictures) {
        temp.push('http://localhost/espresso/data/images/gap/doc_control/doc_control/' + image)
      }
      return JSON.stringify(temp)
    }
    
    return ''
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{background-color:#D3D3D3;width:631px}.userColumn{width:80px}.dateColumn{width:80px}.urlColumn{width:150px}.notesColumn{width:321px;}</style>'
  }
}