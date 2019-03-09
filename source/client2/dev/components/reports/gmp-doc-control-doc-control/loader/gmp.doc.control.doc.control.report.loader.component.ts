import { Component, Input } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { Preview } from '../../report-common/report-preview/report-preview.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp.doc.control.doc.control.report.interface'

@Component({
  selector: 'gmp-doc-control-doc-control-report-loader',
  templateUrl: 'gmp.doc.control.doc.control.report.loader.component.html'
})

export class GMPDocControlDocControlReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(translationService: TranslationService, logService: LogService) {
    super(translationService, logService)
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
  }
}