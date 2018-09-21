import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { AuthorizationItem } from '../interfaces/gmp.packing.scissors.knives.authorization.interface'
import { LogItem } from '../interfaces/gmp.packing.scissors.knives.log.interface'

@Component({
  selector: 'gmp-packing-scissors-knives-item',
  templateUrl: './gmp.packing.scissors.knives.item.html'
})

export class GMPPackingScissorsKnivesItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string
  showCaptureCheckbox: boolean = false

  constructor(private langManager: LanguageService) {

  }

  ngOnInit(): void {
    if ((<AuthorizationItem>this.item).time != undefined) {
      // Autorización
      this.showCaptureCheckbox = false
    } else {
      // Bitácora
      this.showCaptureCheckbox = true
    }
  }

  public update(): void {
    if (this.itemForm.enabled) {
      this.disable()
    } else if (this.itemForm.disabled) {
      this.enable()
    }
  }

  public disable(): void {
    this.itemForm.disable()
  }

  public enable(): void {
    this.itemForm.enable()
  }
}