import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'gmp-packing-atp-testing-test',
  templateUrl: './gmp.packing.atp.testing.test.html'
})

export class GMPPackingATPTestingTestComponent {
  @Input() public testNumber: number
  @Input() entryNumber: number
  @Input('testGroup') public testForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}