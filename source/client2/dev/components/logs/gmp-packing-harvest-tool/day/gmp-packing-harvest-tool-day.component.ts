import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogDay } from '../interfaces/gmp-packing-harvest-tool-log.interface'

@Component({
  selector: 'gmp-packing-harvest-tool-day',
  templateUrl: './gmp-packing-harvest-tool-day.component.html'
})

export class GMPPackingHarvestToolDayComponent {
  @Input() day: LogDay
  @Input() dayForm: FormGroup
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}