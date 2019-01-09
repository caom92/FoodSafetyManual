import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogItem } from '../interfaces/gmp.packing.ozone.water.log.interface'
import { maxLengths } from '../maxLengths/max.lengths'

@Component({
  selector: 'gmp-packing-ozone-water-item',
  templateUrl: './gmp.packing.ozone.water.item.html'
})

export class GMPPackingOzoneWaterItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string
  @Output() addEntry = new EventEmitter<FormArray>()
  @Output() removeEntry = new EventEmitter<FormArray>()

  readonly maxLengths = maxLengths

  constructor(private langManager: LanguageService) {

  }

  public onEntryAdd(): void {
    this.addEntry.emit(<FormArray>this.itemForm.controls.entries)
  }

  public onEntryRemove(): void {
    this.removeEntry.emit(<FormArray>this.itemForm.controls.entries)
  }
}