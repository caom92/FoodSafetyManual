import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogDay } from '../interfaces/gap-packing-bathroom-cleaning-log.interface'

@Component({
  selector: 'gap-packing-bathroom-cleaning-day',
  templateUrl: './gap-packing-bathroom-cleaning-day.component.html'
})

export class GAPPackingBathroomCleaningDayComponent {
  @Input() day: LogDay
  @Input() dayForm: FormGroup
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}