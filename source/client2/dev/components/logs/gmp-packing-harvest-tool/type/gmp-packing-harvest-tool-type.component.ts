import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogType } from '../interfaces/gmp-packing-harvest-tool-log.interface'

@Component({
  selector: 'gmp-packing-harvest-tool-type',
  templateUrl: './gmp-packing-harvest-tool-type.component.html'
})

export class GMPPackingHarvestToolTypeComponent {
  @Input() type: LogType
  @Input() typeForm: FormGroup
  @Input() dayNum: number
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}