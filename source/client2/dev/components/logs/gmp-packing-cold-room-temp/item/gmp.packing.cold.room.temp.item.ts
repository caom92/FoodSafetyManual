import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogItem } from '../interfaces/gmp.packing.cold.room.temp.log.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-item',
  templateUrl: './gmp.packing.cold.room.temp.item.html'
})

export class GMPPackingColdRoomTempItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}