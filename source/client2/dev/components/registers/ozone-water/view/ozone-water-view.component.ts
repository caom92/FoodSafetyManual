import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { OzoneWaterEntryInterface } from '../interfaces/ozone-water.interface'

@Component({
  selector: 'ozone-water-view',
  templateUrl: './ozone-water-view.component.html',
  styleUrls: ['./ozone-water-view.component.css']
})

export class OzoneWaterViewComponent {
  @Language() lang: string
  @ViewChild('report_body') reportHTML: ElementRef
  @Input() registers: Array<OzoneWaterEntryInterface> = []
  currentRegister: OzoneWaterEntryInterface = null
  selectedID: number = null

  constructor() { }
}
