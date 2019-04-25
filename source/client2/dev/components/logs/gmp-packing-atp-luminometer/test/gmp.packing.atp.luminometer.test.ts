import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogTest } from '../interfaces/gmp.packing.atp.luminometer.log.interface'

@Component({
  selector: 'gmp-packing-atp-luminometer-test',
  templateUrl: './gmp.packing.atp.luminometer.test.html'
})

export class GMPPackingATPLuminometerTestComponent {
  @Input() itemID: number
  @Input() weekNum: number
  @Input() typeID: number
  @Input() test: LogTest
  @Input('testGroup') testForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}