import { Component, Input } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { Preview } from '../../report-common/report-preview/report-preview.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp.others.unusual.occurrence.report.interface';

@Component({
  selector: 'gmp-others-unusual-occurrence-report-loader',
  templateUrl: 'gmp.others.unusual.occurrence.report.loader.component.html'
})

export class GMPOthersUnusualOccurrenceReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(translationService: TranslationService, logService: LogService) {
    super(translationService, logService)
  }

  public getPreview(): Array<Preview> {
    let preview: Array<Preview> = []

    if (this.report.entry[0] != undefined) {
      preview.push({ title: null, content: this.report.entry[0].description }) 
    }

    return preview
  }
}