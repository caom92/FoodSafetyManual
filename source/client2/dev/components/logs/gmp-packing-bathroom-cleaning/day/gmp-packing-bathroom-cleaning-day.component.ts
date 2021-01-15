import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogDay } from '../interfaces/gmp-packing-bathroom-cleaning-log.interface'

@Component({
  selector: 'gmp-packing-bathroom-cleaning-day',
  templateUrl: './gmp-packing-bathroom-cleaning-day.component.html'
})

export class GMPPackingBathroomCleaningDayComponent {
  @Input() day: LogDay
  @Input() dayForm: FormGroup
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}