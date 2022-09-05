import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'

@Component({
  selector: 'vehicle-cleaning-view',
  templateUrl: './vehicle-cleaning-view.component.html',
  styleUrls: ['./vehicle-cleaning-view.component.css']
})

export class VehicleCleaningViewComponent {
  @Language() lang: string
  @ViewChild('report_body') reportHTML: ElementRef
  @Input() registers: Array<VehicleCleaningEntryInterface> = []
  currentRegister: VehicleCleaningEntryInterface = null
  selectedID: number = null

  constructor() { }

  /*public onEditRegister(register: VehicleCleaningEntryInterface): void {
    if (register.id != this.selectedID) {
      this.currentRegister = register
      this.selectedID = register.id
    } else {
      this.currentRegister = null
      this.selectedID = null
    }
  }

  public ngOnChanges(): void {
    this.currentRegister = null
    this.selectedID = null
  }*/
}
