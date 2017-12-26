import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogType } from '../interfaces/gmp.packing.preop.log.interface'

@Component({
  selector: 'gmp-packing-preop-type',
  templateUrl: './gmp.packing.preop.type.html'
})

export class GMPPackingPreopTypeComponent {
  @Input() type: LogType
  @Input() actions: Array<{ name: string, en: string, es: string }>
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}