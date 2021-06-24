import { Component, Input } from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'
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

  public ngOnInit(): void {
    this.update()
  }

  public update(): void {
    if (this.toolForm.value.is_captured == false) {
      this.disable()
    } else if (this.toolForm.value.is_captured == true) {
      this.enable()
    }
  }

  public disable(): void {
    let controlArray: Array<AbstractControl> = []

    controlArray.push(this.toolForm.controls.issue_time)
    controlArray.push(this.toolForm.controls.issue_qty)
    controlArray.push(this.toolForm.controls.issue_conditions)
    controlArray.push(this.toolForm.controls.recovery_time)
    controlArray.push(this.toolForm.controls.recovery_qty)
    controlArray.push(this.toolForm.controls.recovery_conditions)
    controlArray.push(this.toolForm.controls.sanitation)
    controlArray.push(this.toolForm.controls.deficiencies)
    controlArray.push(this.toolForm.controls.corrective_actions)

    for (let control of controlArray) {
      control.disable()
    }
  }

  public enable(): void {
    this.toolForm.enable()
  }
}