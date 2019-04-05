import { Component, Input } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { Preview } from '../../report-common/report-preview/report-preview.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp.others.unusual.occurrence.report.interface'

@Component({
  selector: 'gmp-others-unusual-occurrence-report-loader',
  templateUrl: 'gmp.others.unusual.occurrence.report.loader.component.html'
})

export class GMPOthersUnusualOccurrenceReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(logService: LogService) {
    super(logService)
  }

  public getPreview(): Array<Preview> {
    let preview: Array<Preview> = []

    if (this.report.entry[0] != undefined) {
      preview.push({ title: null, content: this.report.entry[0].description }) 
    }

    return preview
  }
}