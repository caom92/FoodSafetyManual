import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogTool } from '../interfaces/gap-packing-harvest-tool-log.interface'

@Component({
  selector: 'gap-packing-harvest-tool-tool',
  templateUrl: './gap-packing-harvest-tool-tool.component.html'
})

export class GAPPackingHarvestToolToolComponent {
  @Input() tool: LogTool
  @Input() toolForm: FormGroup
  @Input() dayNum: number
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}