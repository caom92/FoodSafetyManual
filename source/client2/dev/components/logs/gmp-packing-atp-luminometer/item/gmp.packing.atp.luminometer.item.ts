import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup, FormArray } from '@angular/forms'
import { LogItem, LogWeek, WeekData } from '../interfaces/gmp.packing.atp.luminometer.log.interface'

@Component({
  selector: 'gmp-packing-atp-luminometer-item',
  templateUrl: './gmp.packing.atp.luminometer.item.html'
})

export class GMPPackingATPLuminometerItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') itemForm: FormGroup
  @Input() isAuthorization: boolean = false
  @Language() lang: string
  @Output() addEntry = new EventEmitter<WeekData>()
  @Output() removeEntry = new EventEmitter<WeekData>()

  constructor() {

  }

  public onEntryAdd() {
    this.addEntry.emit({ weeks: this.item.weeks, weeksForm: <FormArray>this.itemForm.controls.weeks })
  }

  public onEntryRemove() {
    this.removeEntry.emit({ weeks: this.item.weeks, weeksForm: <FormArray>this.itemForm.controls.weeks })
  }
}