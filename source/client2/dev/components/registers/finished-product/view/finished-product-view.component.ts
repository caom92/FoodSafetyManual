import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { FinishedProductEntryInterface } from '../interfaces/finished-product.interface'

@Component({
  selector: 'finished-product-view',
  templateUrl: './finished-product-view.component.html',
  styleUrls: ['./finished-product-view.component.css']
})

export class FinishedProductViewComponent {
  @Language() lang: string
  @ViewChild('report_body') reportHTML: ElementRef
  @Input() registers: Array<FinishedProductEntryInterface> = []
  @Input() codes: Array<any>
  @Input() status: Array<any>
  currentRegister: FinishedProductEntryInterface = null
  selectedID: number = null

  constructor() { }
}
