import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

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

  readonly maxLengths = maxLengths

  constructor() {

  }
}