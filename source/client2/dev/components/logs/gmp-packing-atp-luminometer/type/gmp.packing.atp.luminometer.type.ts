import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogType } from '../interfaces/gmp.packing.atp.luminometer.log.interface'

@Component({
  selector: 'gmp-packing-atp-luminometer-type',
  templateUrl: './gmp.packing.atp.luminometer.type.html'
})

export class GMPPackingATPLuminometerTypeComponent {
  @Input() itemID: number
  @Input() weekNum: number
  @Input() type: LogType
  @Input('typeGroup') typeForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}