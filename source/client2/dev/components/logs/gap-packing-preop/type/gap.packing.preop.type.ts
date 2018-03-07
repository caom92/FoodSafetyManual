import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogType } from '../interfaces/gap.packing.preop.log.interface'

@Component({
  selector: 'gap-packing-preop-type',
  templateUrl: './gap.packing.preop.type.html'
})

export class GAPPackingPreopTypeComponent {
  @Input() type: LogType
  @Input() actions: Array<{ name: string, en: string, es: string }>
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}