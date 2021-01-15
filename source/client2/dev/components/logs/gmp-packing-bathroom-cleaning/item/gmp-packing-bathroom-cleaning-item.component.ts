import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogItem } from '../interfaces/gmp-packing-bathroom-cleaning-log.interface'

@Component({
  selector: 'gmp-packing-bathroom-cleaning-item',
  templateUrl: './gmp-packing-bathroom-cleaning-item.component.html'
})

export class GMPPackingBathroomCleaningItemComponent {
  @Input() item: LogItem
  @Input() itemForm: FormGroup
  @Input() dayNum: number
  @Language() lang: string

  constructor(public langManager: LanguageService) {
 
  }
}