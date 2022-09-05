import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Language } from 'angular-l10n'

@Component({
  selector: 'register-title',
  templateUrl: './register-title.component.html'
})

export class RegisterTitleComponent {
  @Language() lang: string
  @Input() name: { en: string, es: string }
  @Output() searchClick = new EventEmitter<any>()
  @Output() reportClick = new EventEmitter<any>()

  constructor() {

  }

  public onSearchClick(): void {
    console.log('onSearchClick')
    this.searchClick.emit()
  }

  public onReportClick(): void {
    console.log('onReportClick')
    this.reportClick.emit()
  }
}