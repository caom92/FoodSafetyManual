import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

@Component({
  selector: 'register-title',
  templateUrl: './register-title.component.html'
})

export class RegisterTitleComponent {
  @Language() lang: string
  @Input() name: {en:string,es:string}

  constructor() {

  }
}