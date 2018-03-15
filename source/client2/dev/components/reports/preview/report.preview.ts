import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

@Component({
  selector: 'report-preview',
  templateUrl: './report.preview.html'
})

export class ReportPreview {
  @Language() lang: string
  @Input() title: string = ""
  @Input() content: string = ""

  constructor() {

  }
}