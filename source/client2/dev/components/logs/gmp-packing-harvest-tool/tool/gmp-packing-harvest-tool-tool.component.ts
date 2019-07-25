import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogTool } from '../interfaces/gmp-packing-harvest-tool-log.interface'

@Component({
  selector: 'gmp-packing-harvest-tool-tool',
  templateUrl: './gmp-packing-harvest-tool-tool.component.html'
})

export class GMPPackingHarvestToolToolComponent {
  @Input() tool: LogTool
  @Input() toolForm: FormGroup
  @Input() dayNum: number
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}